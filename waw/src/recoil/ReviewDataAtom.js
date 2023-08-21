import { atom } from 'recoil';

export const ReviewDataAtom = atom({
  key: 'ReviewDataAtom',
  default: {
    uid: '',
    review: '',
    scene: [],
    quote: '',
  },
});
