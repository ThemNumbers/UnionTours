import { Pending } from '../mobx/interfaces/Tours'

export interface ResponseObject<T> {
  pending: Pending
  data: T
}
interface RequestParams {
  endpoint: string
  options?: RequestInit
}

const API_HOST = 'https://gateway.travelata.ru/apiV1/'

//https://api-gateway.travelata.ru/frontend/tours?limit=2000&departureCity=2&country=92&checkInDateRange%5Bfrom%5D=2022-04-20&checkInDateRange%5Bto%5D=2022-04-20&nightRange%5Bfrom%5D=7&nightRange%5Bto%5D=8&touristGroup%5Badults%5D=2&touristGroup%5Bkids%5D=0&touristGroup%5Binfants%5D=0&priceRange%5Bfrom%5D=6000&priceRange%5Bto%5D=50000000&commandUuid=476f84ef-6098-4436-bad8-b4caa56b3b46&trSm=1&sections%5B%5D=hotels&sections%5B%5D=countries&sections%5B%5D=firstPaymentDefinitions&sections%5B%5D=operators&sections%5B%5D=sortRate

const parseResponse = (response: Response): Promise<{ data: any; pending: Pending }> => {
  if (response.status === 200 || response.status === 201) {
    return response
      .json()
      .then((r) => ({ pending: Pending.DONE, data: r }))
      .catch(() => ({ pending: Pending.DONE, data: undefined }))
  } else if (response.status === 204) {
    return Promise.resolve({ pending: Pending.EMPTY, data: [] })
  } else {
    return Promise.reject()
  }
}

const callApi = <T>(params: RequestParams): Promise<ResponseObject<T>> => {
  const additionalHeaders = (params.options || {}).headers || {}
  const endpoint = `${API_HOST}${params.endpoint}`

  return fetch(endpoint, {
    method: 'GET',
    ...params.options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...additionalHeaders,
    },
  }).then((response) => parseResponse(response))
}

export { callApi }
