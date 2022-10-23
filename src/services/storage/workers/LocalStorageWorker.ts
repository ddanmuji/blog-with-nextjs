class LocalStorageWorker {
  private localStorageSupported: boolean;

  constructor() {
    this.localStorageSupported = typeof window !== 'undefined' && window.localStorage != null;
  }

  /** @description 해당 key에 대한 로컬스토리지 item 조회 */
  get<T>(key: string): T | null {
    if (this.localStorageSupported) {
      const item = window.localStorage.getItem(key) as T | null;
      return item;
    } else return null;
  }

  /** @description 로컬스토리지에 item 저장 */
  set(key: string, item: string) {
    if (this.localStorageSupported) {
      window.localStorage.setItem(key, item);
    }
  }

  /** @description 해당 key에 대한 로컬스토리지 item 삭제 */
  remove(key: string) {
    if (this.localStorageSupported) window.localStorage.removeItem(key);
  }
}

export default LocalStorageWorker;
