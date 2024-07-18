import BoardType from '../type/BoardType.ts';

export const winValidation = (board: BoardType[]): boolean => {
  return !board.some((row) => !row.founded);
};
