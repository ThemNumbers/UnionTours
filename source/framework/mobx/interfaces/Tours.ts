export interface Tour {
  id: string
  price: number
  oilTax: number
  nights: {
    tour: number
    hotel: number
  }
  checkInDate: string
  touristGroup: {
    adults: number
    kids: number
    infants: number
    kidsAges: Array<number>
  }
  meal: number
  departureCity: number
  country: number
  resort: number
  hotel: number
  hotelAvailable: number
  hotelCategory: number
  operator: number
  room: string
  transfer: string
  flightType: string
  medicalInsurance: boolean
  maxHistoricalPrice: number
  discount: number
  sortRate: number
  cashbackAvailable: boolean
  firstPaymentDefinitions: Array<string>
  freeCancellation: boolean
}

export interface Hotel {
  id: number
  name: string
  resort: number
  country: number
  hotelCategory: number
  coords: {
    latitude: number
    longitude: number
  }
  attributes: Array<number>
  rating: number
  beachLine: string
  distances: {
    airport: number
    beach: number
    beachMax: number
    lift: number
    center: number
  }
  reviewsNumber: number
  types: Array<number>
  placement: string
  builtDate: string
  renovationDate: string
  ordersNumber: number
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
