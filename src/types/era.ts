export type Era = '令和' | '平成' | '昭和' | '大正' | '明治';

export const eras: Era[] = ['令和', '平成', '昭和', '大正', '明治'];

export const eraRanges: { [key in Era]: { start: number; end: number } } = {
  令和: { start: 1, end: new Date().getFullYear() - 2018 },
  平成: { start: 1, end: 31 },
  昭和: { start: 1, end: 64 },
  大正: { start: 1, end: 15 },
  明治: { start: 1, end: 45 },
};
