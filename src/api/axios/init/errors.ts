export interface IErrors {
    401: () => any,
    404: () => any
}

const errors: IErrors = {
    401: () => {
        return "Ошибка доступа"
    },
    404: () => {
        return "Запрашиваемый ресурс не найден"
    }
}

export default errors