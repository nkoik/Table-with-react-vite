import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosRequestConfig
} from 'axios'
import type { ServiceParams } from 'types/axios'
import { HttpMethod } from '@/enums/services/axios'

export class HttpService {
  private http: AxiosInstance
  private baseURL = import.meta.env.VITE_API_URL

  constructor() {
    this.http = axios.create({
      baseURL: this.baseURL,
      withCredentials: false
    })
  }

  public service() {
    this.injectInterceptors()
    return this
  }

  // Handle HTTP requests
  private async request<T>(
    method: HttpMethod,
    url: string,
    options: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.http.request<T>({
        method,
        url,
        ...options
      })

      return response.data
    } catch (error) {
      return this.normalizeError(error)
    }
  }

  public async get<T>(url: string, params?: ServiceParams): Promise<T> {
    return this.request<T>(HttpMethod.GET, url, {
      params
    })
  }

  private injectInterceptors() {
    this.http.interceptors.request.use((request) => request)

    this.http.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error)
    )
  }

  private normalizeError(error: Error | unknown) {
    return Promise.reject(error)
  }
}
