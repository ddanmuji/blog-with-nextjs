import type { AxiosInstance } from 'axios';
import { createInstance } from './workers';

abstract class ApiClient {
  private readonly API_PATH = '/api' as const;
  protected readonly instance: AxiosInstance;

  constructor(baseURL: string) {
    const instance = createInstance(`${this.API_PATH}/${baseURL}`);
    this.instance = instance;
  }
}

export default ApiClient;
