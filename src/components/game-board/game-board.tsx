import { FC } from 'react';
import BoardType from '../../type/BoardType.ts';
import { LevelType } from '../../type/LevelType.ts';

interface GameBoardProps {
  board: BoardType[];
  level: LevelType;
}

const GameBoard: FC<GameBoardProps> = ({ board, level }) => {
  return (
    <div className="mb-5 mt-5">
      {board.map((row) => (
        <div key={row.value} className="flex justify-center items-center gap-1">
          {row.letters.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`${level.words.length >= 7 ? 'w-6 h-6 ' : 'w-10 h-10'} flex justify-center items-center ${cell ? 'bg-color-fern' : 'bg-color-concrete'} rounded-xl m-1`}>
              <span
                className={`text-white uppercase text-[${level.words.length >= 7 ? '10px' : '20px'}] font-[700]`}>
                {cell}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
