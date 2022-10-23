import type { Theme } from '../../types';
import LocalStorageWorker from './workers/LocalStorageWorker';

class ThemeStorage {
  storageWorker: LocalStorageWorker;
  storageKey: string;

  constructor(storageKey: string) {
    this.storageWorker = new LocalStorageWorker();
    this.storageKey = storageKey;
  }

  /** @description key가 theme인 값 조회 */
  get() {
    return this.storageWorker.get<Theme>(this.storageKey) || 'light';
  }

  /** @description key가 theme인 값 수정 */
  set(theme: Theme) {
    this.storageWorker.set(this.storageKey, theme);
  }
}

export default new ThemeStorage('theme');
