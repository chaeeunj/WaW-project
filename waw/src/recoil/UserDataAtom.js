import { atom } from 'recoil';

export const UserDataAtom = atom({
  key: 'UserDataAtom',
  default: {
    name: '',
    email: '',
    password: '',
  },
});
