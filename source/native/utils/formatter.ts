const formatBytes = (a: number, b = 2): string => {
  if (a === 0) {
    return '0 B'
  }
  const c = b < 0 ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024))
  return (
    parseFloat((a / Math.pow(1024, d)).toFixed(c)) +
    ' ' +
    ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]
  )
}

const getFilenameFromPath = (path: string): string | undefined => path.split(/[\\\\/]/).pop()

const parseFullName = (input?: string): string | undefined => {
  if (input) {
    const inputArray = input.split(' ')
    if (inputArray.length === 3) {
      const [lastName, firstName] = inputArray
      return `${lastName} ${firstName}`
    }
    return input
  }
}

const formatPhoneNumber = (phone?: string) => {
  if (phone && phone.length) {
    const cleanNum = phone.toString().replace(/\D/g, '')
    const match = cleanNum.match(/^(\d{1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/)
    if (match) {
      return (
        '+7' +
        ' (' +
        match[2] +
        (match[3] ? `) ${match[3]}` : '') +
        (match[4] ? `-${match[4]}` : '') +
        (match[5] ? `-${match[5]}` : '')
      )
    }
    return `+7 ${cleanNum}`
  } else {
    return ''
  }
}

const clearPhone = (phone: string): string => {
  return phone.replace(/_|\.|,|-|\s|\(|\)/g, '')
}

const generateUniqId = (): string => {
  return String(Math.floor(Math.random() * Date.now()))
}

const getPlural = (number: number, titles: string[]) => {
  const cases = [2, 0, 1, 1, 1, 2]
  const fiveRoundCase = number % 10 < 5 ? number % 10 : 5
  return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[fiveRoundCase]]
}

const getRandomNumber = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const getRandomPointsFromString = (str: string) => {
  const parsedGuidLength = String(parseInt(str, 10)).length
  const whoIsTop = parsedGuidLength > 3 ? 0 : parsedGuidLength

  return {
    x1: whoIsTop === 0 ? 48 : getRandomNumber(0, 7),
    x2: whoIsTop === 1 ? 48 : getRandomNumber(0, 7),
    x3: whoIsTop === 2 ? 48 : getRandomNumber(0, 7),
    x4: whoIsTop === 3 ? 48 : getRandomNumber(0, 7),
  }
}

const parseTag = (tag: string) => {
  if (tag.length) {
    return (tag[0].toUpperCase() + tag.slice(1)).replace(/_/g, ' ')
  }
  return ''
}

const formatNDS = (input: string) => {
  return input.includes('НДС') ? input : `${input} %`
}

const formatSum = (sum?: number, hidePostfix?: boolean) => {
  return sum !== undefined
    ? `${String(sum)
        .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
        .replace('.', ',')}${hidePostfix ? '' : ' ₽'}`
    : undefined
}

export {
  formatBytes,
  getFilenameFromPath,
  parseFullName,
  formatPhoneNumber,
  clearPhone,
  generateUniqId,
  getPlural,
  getRandomPointsFromString,
  parseTag,
  formatNDS,
  formatSum,
}
