import { notifyInstance } from './init/notifyInstance'
import exams, { IExamsSocket } from './modules/exams'
import exam, { IExamSocket } from './modules/exam'
import notes, { INotesSocket } from './modules/notes'
import chat, { IChatSocket } from './modules/chat'

export interface IRequestSocket {
  exam: IExamSocket
  exams: IExamsSocket
  notes: INotesSocket
  chat: IChatSocket
}

export const socket: IRequestSocket = {
  exam: exam(notifyInstance()),
  exams: exams(notifyInstance()),
  notes: notes(notifyInstance()),
  chat: chat(notifyInstance())
}
