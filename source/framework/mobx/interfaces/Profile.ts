export interface Profile {
  uid: string
  username: string
  firstName?: string
  lastName?: string
  dateJoined?: string
  lastLogin?: string | null
  email?: string
  loggedIn?: string
  isSuperuser?: boolean
  isStaff?: boolean
  passId?: string
  permissions?: string
  photo?: string
  role: string
  notifications?: PushSettings
  fullName: string
  patronymic: string
  photoFull: string
  birthDate: string
  employmentDate?: string
  department?: string
  departmentMain?: string
  company: string
  position: string
  internalPhone: string
  city?: string
  workPhones: Array<string>
  manager: string
  managerName: string
  assistant?: string
  assistantName?: string
  isTest: boolean
}

export interface PushSettings {
  news: boolean
  tasks: boolean
  events: boolean
  candidates: boolean
}
