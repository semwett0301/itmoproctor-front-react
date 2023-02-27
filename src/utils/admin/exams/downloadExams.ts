import { IExam } from '../../../ts/interfaces/IExam'
import { getStudentName } from '../../common/nameHelper'
import { TFunction } from 'i18next'

export default function(exams: IExam[], t: TFunction): void {
  let examsCsv: string = '"_id","Идентификатор","Правообладатель","Код курса","Код сессии","Номер испытания","Экзамен","Логин слушателя","Электронный адрес слушателя","ФИО слушателя","Проктор","Эксперт","Тип","Длительность","Срок сдачи (начало)","Срок сдачи (окончание)","Плановое время (начало)","Плановое время (окончание)","Время начала","Время окончания","Статус","Комментарий","Примечание для администратора"'

  exams.forEach(exam => {
    examsCsv += `"${exam._id}",
    "${exam.examId}",
    "${exam.organization.shortName ?? exam.organization.fullName}",
    "${exam.course?.courseCode ?? ''}",
    "${exam.course?.sessionCode ?? ''}",
    "${exam.assignment}",
    "${exam.subject}",
    "${exam.student.username}",
    "${exam.student.email}",
    "${getStudentName(exam.student)}",
    "${exam.inspector}",
    "${exam.expert}",
    "${t('examTypes.' + !!exam.async)}",
    "${t('minutesPlurals.counter', { count: exam.duration })}",
    "${exam.leftDate}",
    "${exam.rightDate}",
    "${exam.startDate ?? ''}",
    "${exam.stopDate ?? ''}",
    "${exam.beginDate ?? ''}",
    "${exam.endDate ?? ''}",
    "${exam.endDate ?? ''}",
    "${exam.resolution !== null ? exam.resolution ? 'Принят' : 'Прерван' : ''}",
    "${exam.comment}",
    "${exam.note ?? '-'}",
    `
  })

  const blob = new Blob([examsCsv], {type: "text/plain"})
  const link = document.createElement("a")
  link.setAttribute("href", URL.createObjectURL(blob))
  link.setAttribute("download", "exams.csv")
  link.click()
  document.removeChild(link)
}
