import { useEffect, useState } from 'react';
import Header from './components/header/header.tsx';
import GameBoard from './components/game-board/game-board.tsx';
import gameLevels from '../src/constants/levels/levels.json';
import LetterController from './components/letter-controller/letter-controller.tsx';
import getMinimalLettersSet from './utils/getMinimalLettersSet.ts';
import { LetterType } from './type/LetterType.ts';
import BoardType from './type/BoardType.ts';
import { winValidation } from './utils/winValidation.ts';

type LevelType = {
  id: number;
  words: string[];
};

function App() {
  const [currentlevel, setCurrentLevel] = useState<number>(1);
  const [countLevel, setCount] = useState<number>(1);
  const [board, setBoard] = useState<BoardType[]>([]);
  const [letters, setLetters] = useState<LetterType[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);

  const winner = winValidation(board);

  const level: LevelType = gameLevels.levels.find(
    (level) => level.id === currentlevel
  ) as LevelType;

  const checkWord = (word: string) => {
    const foundedWord = board.find((row) => row.value === word);
    const foundedWordIndex = board.findIndex((row) => row.value === word);
    if (foundedWord && !foundedWord.founded) {
      console.log('we found word: ', word);
      const wordLetters = word.split('');
      const updateBoard: BoardType = {
        ...board[foundedWordIndex],
        founded: true,
        letters: [...wordLetters]
      };

      const newBoard = [
        ...board.slice(0, foundedWordIndex),
        updateBoard,
        ...board.slice(foundedWordIndex + 1)
      ];

      setBoard(newBoard);
    }
  };

  const changeLevel = () => {
    setCurrentLevel((prevState) => (prevState + 1 > 3 ? 1 : prevState + 1));
    setCount((prevState) => prevState + 1);
  };

  useEffect(() => {
    if (currentlevel > 3) {
      setCurrentLevel(1);
    } else {
      const letters = getMinimalLettersSet(level.words);
      setLetters(
        letters.map((letter, index) => ({
          id: index + 1,
          value: letter
        }))
      );
      setBoard(
        level.words
          .sort((a, b) => a.length - b.length)
          .map((word) => ({
            value: word,
            letters: Array(word.length).fill(null),
            founded: false
          }))
      );
    }
  }, [currentlevel]);

  useEffect(() => {
    console.log(board);
  }, [board]);

  if (winner) {
    return (
      <main className="w-screen h-screen bg-color-pickled">
        <div className="py-44 px-40 flex flex-col justify-between items-center gap-y-28">
          <div>
            <div className="text-white text-[37px] font-bold text-center">
              Уровень {countLevel} пройден
            </div>
            <div className="text-white text-[37px] font-bold text-center">Изумительно!</div>
          </div>
          <button
            onClick={changeLevel}
            className="max-w-[130px] w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Уровень {countLevel + 1}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="w-screen h-screen bg-color-pickled">
      <div className="p-7">
        <Header
          headerStyle="flex justify-center items-center gap-3"
          textStyle="text-white text-[30px] font-[700]"
          title="Уровень"
          gameLevel={countLevel}
        />
        <GameBoard board={board} />
        <LetterController
          letters={letters}
          selectedLetters={selectedLetters}
          setSelectedLetters={setSelectedLetters}
          onWordSelected={checkWord}
        />
      </div>
    </main>
  );
}

export default App;
