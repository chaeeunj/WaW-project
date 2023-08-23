import { atom } from 'recoil';

export const MoviesDataAtom = atom({
  key: 'MoviesDataAtom',
  default: [],
});

export const MovieIdAtom = atom({
  key: 'MovieIdAtom',
  default: 0,
});
