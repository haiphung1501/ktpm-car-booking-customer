import {twMerge} from 'tailwind-merge';

const cc = names => {
  if (typeof names === 'string' || typeof names === 'number') return '' + names;

  let out = '';

  if (Array.isArray(names)) {
    for (let i = 0, tmp; i < names.length; i++) {
      if ((tmp = cc(names[i])) !== '') {
        out += (out && ' ') + tmp;
      }
    }
  } else {
    const obj = names;
    for (const k in obj) {
      if (obj[k]) out += (out && ' ') + k;
    }
  }

  return out;
};

export const classNames = (...classes) => twMerge(cc(classes));
