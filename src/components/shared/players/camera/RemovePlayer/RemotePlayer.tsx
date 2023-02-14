import React, {FC, useCallback, useLayoutEffect, useMemo, useState} from 'react';
import {IWebCallSocket} from '../../../../../api/socket/modules/webCall';
import {socket} from '../../../../../api/socket/socket';
import {
  CallState,
  GetMessageType,
  RegisterState,
  SendMessageType,
  WebCallGetMessage
} from '../../../../../config/webCall/webCallConfig';
import {WebRtcPeer} from 'kurento-utils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const kurentoUtils = require('../../../../../kurentoUtils/kurento-utils')

type RemotePlayerProps = {
  userId: string,
}

const RemotePlayer: FC<RemotePlayerProps> = ({userId}) => {
  const [registerState, setRegisterState] = useState<RegisterState>(RegisterState.IN_PROCESS)
  const [callState, setCallState] = useState<CallState>(CallState.NO_CALL)
  const [remotePeer, setRemotePeer] = useState<WebRtcPeer | null>(null)
  const [localPeer, setLocalPeer] = useState<WebRtcPeer>()

  const registerConnection = useCallback((currentSocket: IWebCallSocket) => {
    setRegisterState(RegisterState.IN_PROCESS)
    currentSocket.sendMessage({
      id: SendMessageType.REGISTER,
      name: userId
    })
  }, [userId])

  const socketWebCall = useMemo<IWebCallSocket>(() => {
    return socket.webCall({
      userId: userId,
      beforeConnect: () => {
        if (registerState !== RegisterState.IN_PROCESS) {
          registerConnection(socketWebCall)
        }
      }
    })
  }, [userId, registerState, registerConnection])

  const registerResponse = useCallback<(message: WebCallGetMessage) => void>(message => {
    if (message.response == 'accepted') {
      setRegisterState(RegisterState.REGISTERED);
    } else {
      setRegisterState(RegisterState.NOT_REGISTERED);
      console.error(message.message ? message.message : 'Unknown reason for register rejection.');
    }
  }, [])

  const stop = useCallback<(flag: boolean) => void>((flag) => {
    setCallState(CallState.NO_CALL);
    if (remotePeer) {
      remotePeer.dispose()
      setRemotePeer(null)
    }
    flag && socketWebCall.sendMessage({
      id: SendMessageType.STOP,
      unregister: flag
    });
  }, [socketWebCall, remotePeer])

  // const restart = useCallback<(message: WebCallGetMessage) => void>(() => {
  //   stop(false);
  //
  //   if (localePeer) {
  //     setTimeout(function() {
  //       call(localePeer);
  //     }, 500);
  //   }
  // }, [])

  const onError = useCallback<(error?: string) => void>(error => {
    if (error) {
      console.error(error);
      stop(false);
    }
  }, [stop])

  const incomingCall = useCallback<(message: WebCallGetMessage) => void>(message => {
      // If busy, just reject without disturbing the user
      if (callState != 'NO_CALL') {
        socketWebCall.sendMessage({
          id: SendMessageType.INCOMING_CALL_RESPONSE,
          from: message.from ?? '',
          callResponse: 'reject',
          message: 'busy'
        })
      } else {
        setCallState(CallState.PROCESSING_CALL);

        setRemotePeer(kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv({},
          function (error: string | undefined) {
            if (error) {
              onError(error);
            } else {
              localPeer?.generateOffer(function (offerError, sdpOffer) {
                if (offerError) {
                  onError(offerError)
                } else {
                  socketWebCall.sendMessage({
                    id: SendMessageType.INCOMING_CALL_RESPONSE,
                    from: message.from ?? '',
                    callResponse: 'accept',
                    sdpOffer: sdpOffer
                  })
                }
              });
            }
          }
        ))
      }
    }, [callState, onError, remotePeer, socketWebCall])

  const startCommunication = useCallback<(message: WebCallGetMessage) => void>(message => {
    if (remotePeer) {
      setCallState(CallState.IN_CALL);
      message.sdpAnswer ? remotePeer.processAnswer(message.sdpAnswer) : console.error('Empty sdp answer');
    }
  }, [remotePeer])

  const callResponse = useCallback<(message: WebCallGetMessage) => void>(message => {
    if (message.response != 'accepted') {
      console.info('Call not accepted by peer. Closing call');
      console.error(message.message ? message.message : 'Unknown reason for register rejection.');
      stop(false);
    } else {
      startCommunication(message);
    }
  }, [startCommunication, stop])

  const messageToFunction = useMemo<{
    [key in GetMessageType]: (message: WebCallGetMessage) => void
  }>(() => {
    return {
      [GetMessageType.REGISTER_RESPONSE]: registerResponse,
      [GetMessageType.CALL_RESPONSE]: callResponse,
      [GetMessageType.START_COMMUNICATION]: startCommunication,
      [GetMessageType.STOP_COMMUNICATION]: () => {
        console.info('Communication ended by remote peer');
        stop(false);
      },
      [GetMessageType.RESTART_COMMUNICATION]: () => {
        console.log('restart communication')
      },
      [GetMessageType.INCOMING_CALL]: incomingCall,
      [GetMessageType.ICE_CANDIDATE]: message => {
        if (remotePeer && message.candidate) {
          remotePeer.addIceCandidate(message.candidate);
        }
      }
    }
  }, [callResponse, registerResponse, remotePeer, startCommunication, stop])

  useLayoutEffect(() => {
    socketWebCall.getMessage(message => {
      messageToFunction[message.id](message)
    })

    return () => {
      socketWebCall.disconnect()
    }
  }, [messageToFunction, socketWebCall])

  return (
    <div>
      {/* <button onClick={() => { */}
      {/*   stop(true) */}
      {/* }}/> */}
    </div>
  );
}

export default RemotePlayer;
