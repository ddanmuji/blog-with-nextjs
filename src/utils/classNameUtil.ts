export const setBodyClassToDarkTheme = {
  set() {
    document.querySelector('body')?.classList.add('dark');
  },
  remove() {
    document.querySelector('body')?.classList.remove('dark');
  },
};
