import { notifyInstance } from './init/notifyInstance'
import exams, { IExamsSocket } from './modules/exams'
import exam, { IExamSocket } from './modules/exam'

export interface IRequestSocket {
  exam: IExamSocket
  exams: IExamsSocket
}

export const socket: IRequestSocket = {
  exam: exam(notifyInstance()),
  exams: exams(notifyInstance())
}
