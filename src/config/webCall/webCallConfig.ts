export type WebCallConfig = {
  url: string,
  credential?: string,
  username?: string
}[]

export const iceServers: WebCallConfig = [{
  url: 'stun:stun.l.google.com:19302'
}, {
  url: 'stun:stun1.l.google.com:19302'
}, {
  url: 'stun:stun2.l.google.com:19302'
}, {
  url: 'stun:stun3.l.google.com:19302'
}, {
  url: 'stun:stun4.l.google.com:19302'
}, {
  url: 'stun:stun.anyfirewall.com:3478'
}, {
  url: 'turn:numb.viagenie.ca:3478?transport=udp',
  credential: 'proctor',
  username: 'proctor'
}, {
  url: 'turn:turn.anyfirewall.com:443?transport=tcp',
  credential: 'webrtc',
  username: 'webrtc'
}]

// IN_PROCESS -- когда открываем вебсокет
// REGISTERED -- когда сервер принял регистрацию
// NOT_REGISTERED -- когда сервер не принял регистрацию
export enum RegisterState {
  NOT_REGISTERED = 'NOT_REGISTERED',
  IN_PROCESS = 'IN_PROCESS',
  REGISTERED = 'REGISTERED'
}

// NO_CALL - когда нет звонка
// PROCESSING_CALL - когда мы звоним
// IN_CALL - когда дозвонились
export enum CallState {
  NO_CALL = 'NO_CALL',
  PROCESSING_CALL = 'PROCESSING_CALL',
  IN_CALL = 'IN_CALL'
}

// REGISTER -- регистрация вебсокета
// CALL -- звонок
// ON_ICE_CANDIDATE -- найденные ICE-кандидаты
// INCOMING_CALL_RESPONSE -- ответ на звонок
// STOP -- остановка звонка
export enum SendMessageType {
  REGISTER = 'register',
  CALL = 'call',
  ON_ICE_CANDIDATE = 'onIceCandidate',
  INCOMING_CALL_RESPONSE = 'incoming_call_response',
  STOP = 'stop'
}

type RegisterMessage = {
  id: SendMessageType.REGISTER,
  name: string
}

type CallMessage = {
  id: SendMessageType.CALL,
  from: string,
  to: string,
  sdpOffer: string
}

type OnIceCandidateMessage = {
  id: SendMessageType.ON_ICE_CANDIDATE,
  candidate: RTCIceCandidate
}

type IncomingCallResponseMessage = {
  id: SendMessageType.INCOMING_CALL_RESPONSE,
  from: string,
  callResponse: string,
  message?: string
  sdpOffer?: string
}

type StopMessage = {
  id: SendMessageType.STOP,
  unregister: boolean
}

export type WebCallSendMessage = RegisterMessage | CallMessage | OnIceCandidateMessage | StopMessage | IncomingCallResponseMessage

export enum CallError {
  InvalidStateError = 'InvalidStateError: Failed to execute \'addStream\' on \'RTCPeerConnection\': The RTCPeerConnection\'s signalingState is \'closed\'.',
  NotAllowedError= 'NotAllowedError',
  NotAllowedErrorState = 'NotAllowedError: Invalid state',
  NotAllowedErrorPermission = 'NotAllowedError: Permission denied',
  NotAllowedErrorPermissionSystem = 'NotAllowedError: Permission denied by system',
  NotAllowedErrorRequest = 'NotAllowedError: The request is not allowed by the user agent or the platform in the current context.',
  NotFoundError = 'NotFoundError',
  NotFoundErrorDevice = 'NotFoundError: Requested device not found',
  NotFoundErrorObjectNotFound = 'NotFoundError: The object can not be found here.',
  NotReadableError = 'NotReadableError',
  NotReadableErrorStartVideo = 'NotReadableError: Could not start video source',
  NotReadableErrorAllocateVideo = 'NotReadableError: Failed to allocate videosource',
  OverconstrainedError = 'OverconstrainedError',
  TypeError = 'TypeError: Failed to execute \'getUserMedia\' on \'MediaDevices\': At least one of audio and video must be requested',
  Default = 'Default'
}

const baseVideoErrorPath = 'shared.settings.errors.webcam'

export const videoCallErrorToMessageConfig: {
  [key in CallError]: string
} = {
  [CallError.InvalidStateError]: `${baseVideoErrorPath}.InvalidStateError`,
  [CallError.NotAllowedError]: `${baseVideoErrorPath}.NotAllowedError`,
  [CallError.NotAllowedErrorState]: `${baseVideoErrorPath}.NotAllowedErrorState`,
  [CallError.NotAllowedErrorPermission]: `${baseVideoErrorPath}.NotAllowedErrorPermission`,
  [CallError.NotAllowedErrorPermissionSystem]: `${baseVideoErrorPath}.NotAllowedErrorPermissionSystem`,
  [CallError.NotAllowedErrorRequest]: `${baseVideoErrorPath}.NotAllowedErrorRequest`,
  [CallError.NotFoundError]: `${baseVideoErrorPath}.NotFoundError`,
  [CallError.NotFoundErrorDevice]: `${baseVideoErrorPath}.NotFoundErrorDevice`,
  [CallError.NotFoundErrorObjectNotFound]: `${baseVideoErrorPath}.NotFoundErrorObjectNotFound`,
  [CallError.NotReadableError]: `${baseVideoErrorPath}.NotReadableError`,
  [CallError.NotReadableErrorStartVideo]: `${baseVideoErrorPath}.NotReadableErrorStartVideo`,
  [CallError.NotReadableErrorAllocateVideo]: `${baseVideoErrorPath}.NotReadableErrorAllocateVideo`,
  [CallError.OverconstrainedError]: `${baseVideoErrorPath}.OverconstrainedError`,
  [CallError.TypeError]: `${baseVideoErrorPath}.TypeError`,
  [CallError.Default]: `${baseVideoErrorPath}.Default`,
}

const baseScreenErrorPath = 'shared.settings.errors.screen'

export const screenCallErrorToMessageConfig: {
  [key in CallError]?: string
} = {
  [CallError.NotAllowedErrorPermission]: `${baseScreenErrorPath}.NotAllowedErrorPermission`,
  [CallError.NotAllowedErrorRequest]: `${baseScreenErrorPath}.NotAllowedErrorRequest`
}

// REGISTER_RESPONSE -- вебсокет зарегистрирован (или нет)
// CALL_RESPONSE -- звонок другим клиентом принят (или нет)
// INCOMING_CALL -- пришел звонок
// START_COMMUNICATION -- можно начать звонок
// STOP_COMMUNICATION -- звонок остановлен
// RESTART_COMMUNICATION -- необходимо перезвонить
// ICE_CANDIDATE -- выбран ICE-кандидат
export enum GetMessageType {
  REGISTER_RESPONSE = 'registerResponse',
  CALL_RESPONSE = 'callResponse',
  INCOMING_CALL = 'incomingCall',
  START_COMMUNICATION = 'startCommunication',
  STOP_COMMUNICATION = 'stopCommunication',
  RESTART_COMMUNICATION = 'restartCommunication',
  ICE_CANDIDATE = 'iceCandidate'
}

export type WebCallGetMessage = {
  id: GetMessageType,
  response?: string,
  message?: string,
  sdpAnswer?: string,
  from?: string,
  candidate?: RTCIceCandidate
}




