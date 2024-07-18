import { FC } from 'react';

interface GameBoardProps {
  words: string[];
}

const GameBoard: FC<GameBoardProps> = ({ words }) => {
  const sortedWords = [...words].sort((a, b) => a.length - b.length);

  return (
    <div className="mb-5 mt-5">
      {sortedWords.map((word, index) => (
        <div key={index} className="flex justify-center items-center gap-1">
          {Array.from({ length: word.length }).map((_, cellindex) => (
            <div
              key={cellindex}
              className="w-8 h-8 flex justify-center items-center bg-color-fern rounded-xl m-1">
              <span className="text-white uppercase text-[20px] font-[700]">{word[cellindex]}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;