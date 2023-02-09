export const downloadByHref = (href: string, fileName?: string) => {
  const link = document.createElement('a')
  link.href = href
  link.download = fileName ?? 'file'
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.removeChild(link)
}
