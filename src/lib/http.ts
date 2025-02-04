import axios from 'axios'
import { getCurrentSession } from './auth';
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

  async get(url: string) {
    const response = await this.http.get(url)
    return response.data
  }

  async post(url: string, data: unknown) {
    const response = await this.http.post(url, data)
    return response.data
  }
}
