export const getTime = (seconds: number): string => {
  const newSec = Math.ceil(seconds)

  const sec = Math.floor(newSec % 60)
  let min = Math.floor(newSec / 60)

  let strSec = String(sec)

  if (seconds < 10) {
    strSec = 0 + strSec
  }

  if (min === 0) return `00:${strSec}`

  if (min < 60) return `${Math.floor(min / 10)}${min % 10}:${Math.floor(sec / 10)}${sec % 10}`
  else {
    const hours = Math.floor(min / 60)
    min %= 60
    return `${hours}:${min}:${sec}`
  }
}
