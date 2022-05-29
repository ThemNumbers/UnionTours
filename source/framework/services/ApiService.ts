import { API_HOST } from '../../native/utils/constants'
import { Pending } from '../mobx/interfaces/Tours'

export interface ResponseObject<T> {
  pending: Pending
  data: T
}
interface RequestParams {
  endpoint: string
  options?: RequestInit
}

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
