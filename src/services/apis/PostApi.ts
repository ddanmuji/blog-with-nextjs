import { AxiosPromise } from 'axios';

import type { CreateArticleBody } from '../../types';
import ApiClient from './core/ApiClient';

class PostApi extends ApiClient {
  constructor() {
    super('post');
  }

  create(body: CreateArticleBody): AxiosPromise<{ message: string }> {
    return this.instance.post('/write', body);
  }
}

export default new PostApi();
