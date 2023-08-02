import { KeyOfPalette } from '@ceos-fe/ui';
import { atom } from 'recoil';

export const HeaderState = atom<KeyOfPalette>({
  key: 'backColor',
  default: 'Blue',
});
export const generationState = atom<number>({ key: 'generation', default: 0 });
