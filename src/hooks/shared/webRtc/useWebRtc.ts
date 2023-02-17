import {MutableRefObject, useCallback, useEffect, useMemo, useRef} from 'react';
import {
  CallState,
  GetMessageType,
  iceServers,
  RegisterState,
  SendMessageType,
  WebCallConfig,
  WebCallGetMessage,
  WebCallSendMessage
} from '../../../config/webCall/webCallConfig';
import {WebRtcPeer} from 'kurento-utils';
import socketConfig from '../../../config/api/socketConfig';
import {io, Socket} from 'socket.io-client';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const kurentoUtils = require('../../../kurentoUtils/kurento-utils')

type MediaConstrains = {
  audio: {
    optional: [{
      sourceId?: string
    }]
  },
  video: {
    mandatory: {
      maxWidth: number,
      maxHeight: number,
      maxFrameRate: number,
      minFrameRate: number
    },
    optional: [{
      sourceId?: string
    }]
  }
}

type Options = {
  localVideo: HTMLVideoElement | null,
  remoteVideo: HTMLVideoElement | null,
  onicecandidate: (candidate: RTCIceCandidate) => void,
  mediaConstraints: MediaConstrains,
  configuration: {
    iceServers: WebCallConfig
  }
}

export function useWebRtc(userId: string, constrains: {
  cameraId?: string,
  microId?: string,
  maxWidth: number,
  maxHeight: number,
  maxFrameRate: number,
  minFrameRate: number
}): {
  input: MutableRefObject<HTMLVideoElement | null>
  output: MutableRefObject<HTMLVideoElement | null>
  call: (receiver: string) => void
  stop: () => void
} {
  const socket = useRef<Socket | null>(null)

  const registerState = useRef<RegisterState>(RegisterState.NOT_REGISTERED)
  const callState = useRef<CallState>(CallState.NO_CALL)

  const receiver = useRef<string>('')
  const peer = useRef<WebRtcPeer | null>(null)

  const input = useRef<HTMLVideoElement | null>(null)
  const output = useRef<HTMLVideoElement | null>(null)

  const sendMessage = useCallback<(message: WebCallSendMessage) => void>(message => {
    if (socket.current) {
      socket.current.send(JSON.stringify(message))
    }
  }, [])

  const registerResponse = useCallback<(message: WebCallGetMessage) => void>(message => {
    if (message.response == 'accepted') {
      registerState.current = RegisterState.REGISTERED;
    } else {
      registerState.current = RegisterState.NOT_REGISTERED;
      console.error(message.message ? message.message : 'Unknown reason for register rejection.');
    }
  }, [registerState])

  const getOptions = useCallback<() => Options>(() => {
    return {
      localVideo: input.current,
      remoteVideo: output.current,
      onicecandidate: candidate => {
        sendMessage({
          id: SendMessageType.ON_ICE_CANDIDATE,
          candidate: candidate
        })
      },
      mediaConstraints: {
        audio: {
          optional: [{
            sourceId: constrains.microId,
          }]
        },
        video: {
          mandatory: {
            maxWidth: constrains.maxWidth,
            maxHeight: constrains.maxHeight,
            maxFrameRate: constrains.maxFrameRate,
            minFrameRate: constrains.minFrameRate
          },
          optional: [{
            sourceId: constrains.cameraId
          }]
        }
      },
      configuration: {
        iceServers: iceServers
      }
    };
  }, [constrains.cameraId, constrains.maxFrameRate, constrains.maxHeight, constrains.maxWidth, constrains.microId, constrains.minFrameRate, sendMessage])

  const stop = useCallback<(flag: boolean) => void>((flag) => {
    callState.current = CallState.NO_CALL;
    if (peer.current) {
      peer.current.dispose()
      peer.current = null
    }
    sendMessage({
      id: SendMessageType.STOP,
      unregister: flag
    });
  }, [sendMessage])

  const onError = useCallback<(error?: string) => void>(error => {
    if (error) {
      console.error(error);
      stop(false);
    }
  }, [stop])

  const incomingCall = useCallback<(message: WebCallGetMessage) => void>(message => {
    // If busy, just reject without disturbing the user
    if (callState.current != CallState.NO_CALL) {
      sendMessage({
        id: SendMessageType.INCOMING_CALL_RESPONSE,
        from: message.from ?? '',
        callResponse: 'reject',
        message: 'busy'
      })
    } else {
      callState.current = CallState.PROCESSING_CALL;

      peer.current = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(getOptions(),
        function (error: string | undefined) {
          if (error) {
            onError(error);
          } else {
            peer.current?.generateOffer(function (offerError, sdpOffer) {
              if (offerError) {
                onError(offerError)
              } else {
                sendMessage({
                  id: SendMessageType.INCOMING_CALL_RESPONSE,
                  from: message.from ?? '',
                  callResponse: 'accept',
                  sdpOffer: sdpOffer
                })
              }
            });
          }
        }
      )
    }
  }, [getOptions, onError, sendMessage])

  const startCommunication = useCallback<(message: WebCallGetMessage) => void>(message => {
    if (peer.current) {
      callState.current = CallState.IN_CALL;
      message.sdpAnswer ? peer.current.processAnswer(message.sdpAnswer) : console.error('Empty sdp answer');
    }
  }, [])

  const callResponse = useCallback<(message: WebCallGetMessage) => void>(message => {
    if (message.response != 'accepted') {
      console.info('Call not accepted by peer. Closing call');
      console.error(message.message ? message.message : 'Unknown reason for register rejection.');
      stop(false);
    } else {
      startCommunication(message);
    }
  }, [startCommunication, stop])

  const call = useCallback<(currentReceiver: string) => void>(currentReceiver => {
    const onOffer: (error: string | null, sdpOffer: string) => void = (error, sdpOffer) => {
      if (error) {
        onError(error);
      } else {
        if (callState.current == CallState.NO_CALL) {
          peer.current?.dispose();
        } else {
          sendMessage({
            id: SendMessageType.CALL,
            from: userId,
            to: receiver.current,
            sdpOffer: sdpOffer
          });
        }
      }
    }

    if (callState.current === CallState.NO_CALL) {
      if (input.current || output.current) {
        receiver.current = currentReceiver
        callState.current = CallState.PROCESSING_CALL;

        if (input.current && output.current) {
          peer.current = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(getOptions(), function (currentError: string | undefined) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            currentError ? onError(currentError) : this.generateOffer(onOffer)
          });
        }
        if (input.current && !output.current) {
          peer.current = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(getOptions());
        }
        if (!input.current && output.current) {
          peer.current = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(getOptions());
        }
      }
    }
  }, [onError, sendMessage, userId, getOptions])

  const restart = useCallback<() => void>(() => {
    stop(false);
    if (receiver.current) {
      setTimeout(() => {
        call(receiver.current);
      }, 500);
    }
  }, [call, stop])

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
        if (peer.current && message.candidate) {
          peer.current.addIceCandidate(message.candidate);
        }
      }
    }
  }, [callResponse, incomingCall, registerResponse, peer, restart, startCommunication, stop])

  useEffect(() => {
    if (callState.current === CallState.IN_CALL) {
      restart()
    }
  }, [restart])

  useEffect(() => {
      socket.current = io(`${socketConfig.baseUrl}webcall`)

      socket.current.on('connect', function () {
        if (registerState.current !== RegisterState.IN_PROCESS) {

          registerState.current = RegisterState.IN_PROCESS

          sendMessage({
            id: SendMessageType.REGISTER,
            name: userId
          })
        }
      })

      socket.current.on('message', message => {
        const messageObj: WebCallGetMessage = JSON.parse(message)
        messageToFunction[messageObj.id](messageObj)
      })

      return () => {
        stop(true)
        socket.current && socket.current.disconnect()
      }
  }, [])

  return {
    input, output, call, stop: () => {
      stop(false)
    }
  }
}
