import { atom } from 'recoil';

export const itemsState = atom({
  key: 'itemsState',
  default: [],
});

export const searchResultsState = atom({
  key: 'searchResultsState',
  default: [],
});

export const selectedItemState = atom({
  key: 'selectedItemState',
  default: null,
});

export const keywordState = atom({
  key: 'keywordState',
  default: '',
});

export const titleState = atom({
  key: 'titleState',
  default: '',
});

export const contentState = atom({
  key: 'contentState',
  default: '',
});
