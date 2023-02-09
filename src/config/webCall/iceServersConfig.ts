type IceServersConfig = {
  url: string,
  credential?: string,
  username?: string
}[]

export const iceServers: IceServersConfig = [{
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
