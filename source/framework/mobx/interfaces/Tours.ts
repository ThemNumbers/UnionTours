export interface Tour {
  city: Array<string>
  days: string
  id: string
  image_explore_preview: [{ image: string; avg: string }]
  nights: string
  price: string
  region: Array<string>
  screen: string
  slug: string
  sort: number
  tags_ids: string
  title: string
  url: string
}

export enum Pending {
  LOADING,
  DONE,
  FAILED,
  CLEAR,
  EMPTY,
}

export interface SelectedDates {
  startDate?: Date
  endDate?: Date
}
