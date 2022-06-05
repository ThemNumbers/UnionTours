export interface Tour {
  city: Array<string>
  days: string
  id: string
  image_explore_preview: Array<TourImage>
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

export interface TourImage {
  image: string
  avg: string
}

export interface FullApiTourResp {
  cities: Array<string>
  event_types: Array<TourTag>
  item: FullTour
  partners: Array<TourPartner>
  regions: Array<TourTag>
  tags: Array<TourTag>
  type_audio_guides: Array<string>
}

export interface TourTag {
  id: string
  slug: string
  title: string
}

export interface TourPartner {
  emails_request: Array<string>
  id: string
  logo_images: Array<string>
  phones: Array<string>
  sites: Array<string>
  slug: string
  title: string
}

export interface FullTour {
  city: string
  complexity: string
  days: number
  description: string
  email: string
  hotel_stars: string
  id: string
  id_izi_travel: string
  image_detailed_page_main: Array<string>
  image_explore_preview: Array<TourImage>
  images: Array<TourImage>
  included: string
  language: string
  min_age: string
  min_group_count: string
  nights: number
  paid_separately: string
  partner: string
  price: string
  region: Array<string>
  route: Array<TourRoute>
  season_end: string
  season_start: string
  slug: string
  sort: number
  tags_ids: Array<string>
  title: string
  tour_type: string
  type_audio_guide: Array<string>
}

export interface TourRoute {
  day: number
  day_contents: Array<TourDayContent>
  day_title: string
  events: Array<string>
}

export interface TourDayContent {
  about_booking: string
  address: string
  billing_product_id: string
  cg_announcement: string
  city: Array<string>
  coordinates: Coordinates
  description: string
  duration: string
  event_types_ids: Array<string>
  id: string
  image_detailed_page_main: Array<TourImage>
  image_explore_preview: Array<TourImage>
  images: Array<TourImage>
  is_can_buy: boolean
  min_age: number
  places_ids: Array<string>
  purchase_addtitional_info: string
  purchase_method: string
  region: Array<string>
  rp_price_id: number
  schedule: Array<string>
  schedule_description: string
  screen: string
  session_ids: Array<string>
  slug: string
  small_schedule: Array<string>
  sort: number
  tags_ids: Array<string>
  test: string
  ticket_price: string
  title: string
  type_audio_guide: Array<string>
  url: string
  without_schedule: boolean
}

export interface Coordinates {
  lng: number
  lat: number
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
