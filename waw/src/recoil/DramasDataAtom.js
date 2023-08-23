import { atom } from 'recoil';

export const DramasDataAtom = atom({
  key: 'DramasDataAtom',
  default: [],
});

export const DramaIdAtom = atom({
  key: 'DramaIdAtom',
  default: 0,
});
