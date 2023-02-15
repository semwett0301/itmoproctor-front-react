import React, {FC, useCallback, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {IWebCallSocket} from '../../../../../api/socket/modules/webCall';
import {socket} from '../../../../../api/socket/socket';
import {
  CallState,
  GetMessageType, iceServers,
  RegisterState,
  SendMessageType,
  WebCallConfig,
  WebCallGetMessage
} from '../../../../../config/webCall/webCallConfig';
import {WebRtcPeer} from 'kurento-utils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const kurentoUtils = require('../../../../../kurentoUtils/kurento-utils')

type Options = {
  localVideo: HTMLVideoElement | null,
  remoteVideo: HTMLVideoElement | null,
  onicecandidate: (candidate: RTCIceCandidate) => void,
  mediaConstraints: object,
  configuration: {
    iceServers: WebCallConfig
  }
}

type RemotePlayerProps = {
  userId: string,
  dispose: () => void,
  constraints: () => object | object
}

const RemotePlayer: FC<RemotePlayerProps> = ({userId, dispose, constraints}) => {
  const [registerState, setRegisterState] = useState<RegisterState>(RegisterState.IN_PROCESS)
  const [callState, setCallState] = useState<CallState>(CallState.NO_CALL)
  const [remotePeer, setRemotePeer] = useState<WebRtcPeer | null>(null)
  const [localPeer, setLocalPeer] = useState<WebRtcPeer>()

  const input = useRef<HTMLVideoElement | null>(null)
  const output = useRef<HTMLVideoElement | null>(null)

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

  const getOptions = useCallback<() => Options>(() => {
    return {
      localVideo: input.current,
      remoteVideo: output.current,
      onicecandidate: candidate => socketWebCall.sendMessage({
        id: SendMessageType.ON_ICE_CANDIDATE,
        candidate: candidate
      }),
      mediaConstraints: typeof constraints === 'function' ? constraints() : constraints,
      configuration: {
        iceServers: iceServers
      }
    };
  }, [constraints, socketWebCall])

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

      setRemotePeer(kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(getOptions(),
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
  }, [callState, getOptions, localPeer, onError, socketWebCall])

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

  const call = useCallback<(peer: WebRtcPeer) => void>(peer => {
    if (callState === CallState.NO_CALL) {
      if (input.current || output.current) {
        setLocalPeer(peer)
        setCallState(CallState.PROCESSING_CALL);

        const onOffer: (error: string | undefined, sdpOffer: string) => void = (error, sdpOffer) => {
          if (error) {
            onError(error);
          } else {
            if (callState == CallState.NO_CALL) {
              dispose();
            } else {
              socketWebCall.sendMessage({
                id: SendMessageType.CALL,
                from: userId,
                to: peer,
                sdpOffer: sdpOffer
              });
              // if (self.audio === false) self.toggleAudio(false);
              // if (self.video === false) self.toggleVideo(false);
            }
          }

          if (input && output) {
            kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(getOptions(), (currentError: string | undefined) => {
              currentError ? onError(currentError) : localPeer?.generateOffer(onOffer)
            });
          }
          if (input && !output) {
            kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(getOptions(), function (currentError: string | undefined) {
              currentError ? onError(currentError) : localPeer?.generateOffer(onOffer)
            });
          }
          if (!input && output) {
            kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(getOptions(), function (currentError: string | undefined) {
              currentError ? onError(currentError) : localPeer?.generateOffer(onOffer)
            });
          }
        }
      }
    }
  }, [callState, dispose, getOptions, localPeer, onError, socketWebCall, userId])

  const restart = useCallback<(message: WebCallGetMessage) => void>(() => {
    stop(false);
    if (localPeer) {
      setTimeout(() => {
        call(localPeer);
      }, 500);
    }
  }, [call, localPeer, stop])

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
      [GetMessageType.RESTART_COMMUNICATION]: restart,
      [GetMessageType.INCOMING_CALL]: incomingCall,
      [GetMessageType.ICE_CANDIDATE]: message => {
        if (remotePeer && message.candidate) {
          remotePeer.addIceCandidate(message.candidate);
        }
      }
    }
  }, [callResponse, incomingCall, registerResponse, remotePeer, restart, startCommunication, stop])

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
