export const fetchWithTimeout = (
  url: string,
  options: RequestInit,
  timeout = 15000
): Promise<Response> => {
  return Promise.race([
    fetch(url, options),
    new Promise<Response>((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout)),
  ])
}
