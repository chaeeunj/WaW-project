import { atom } from 'recoil';
import { data } from '../mock';

export const ContentsDataAtom = atom({
  key: 'ContentsDataAtom',
  default: data,
});
