export const updateData = (data: object) => {
  const storageStr = sessionStorage.getItem('data')
  let storageData: object = storageStr ? JSON.parse(storageStr) : {}
  storageData = Object.assign(storageData, data)
  sessionStorage.setItem('data', JSON.stringify(storageData))
}

export type TQuestionSectionProps = {
  pathToPrev?: string
  pathToNext?: string
}

export const getData = () => {
  const storageStr = sessionStorage.getItem('data')
  return storageStr ? JSON.parse(storageStr) : {}
}
