import {notifyInstance} from './init/notifyInstance'
import exams from './modules/exams'
import exam from './modules/exam'
import notes from './modules/notes'
import chat from './modules/chat'
import {webCall} from './modules/webCall';
import {webCallInstance} from './init/webCallInstance';

export const socket = {
  exam: exam(notifyInstance()),
  exams: exams(notifyInstance()),
  notes: notes(notifyInstance()),
  chat: chat(notifyInstance()),
  webCall: (beforeConnect?: () => void) => webCall(webCallInstance(beforeConnect))
}
