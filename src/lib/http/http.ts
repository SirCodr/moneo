import axios from 'axios'
import { getCurrentSession } from '../auth';
import { httpResponse } from './types';
export class HttpAdapter {
  private http

  constructor() {
    this.http = axios.create({
      baseURL: process.env.NODE_ENV === 'development'
        ? 'http://localhost:3001/'
        : process.env.NEXT_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      
    })

    this.setupInterceptors()
  }

  setupInterceptors() {
    this.http.interceptors.request.use(
      async (config) => {
        if (!config.url?.includes('/login')) {
          const session = await getCurrentSession()

          if (session) {
            config.headers.Authorization = `Bearer ${session.access_token} ${session.refresh_token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  async get<T>(url: string): Promise<httpResponse<T>> {
    const response = await this.http.get(url)
    return response.data
  }

  async post<T>(url: string, data: unknown): Promise<httpResponse<T>> {
    const response = await this.http.post(url, data)
    return response.data
  }
}
