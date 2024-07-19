import { useEffect, useState } from 'react';
import BoardType from '../../type/BoardType.ts';
import { LetterType } from '../../type/LetterType.ts';
import { winValidation } from '../../utils/winValidation.ts';
import { LevelType } from '../../type/LevelType.ts';
import gameLevels from '../../constants/levels/levels.json';
import getMinimalLettersSet from '../../utils/getMinimalLettersSet.ts';
import Header from '../header/header.tsx';
import GameBoard from '../game-board/game-board.tsx';
import LetterController from '../letter-controller/letter-controller.tsx';

const Game = () => {
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [countLevel, setCount] = useState<number>(1);
  const [board, setBoard] = useState<BoardType[]>([]);
  const [letters, setLetters] = useState<LetterType[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [previewWord, setPreviewWord] = useState<string>('');

  const winner = winValidation(board);

  const level: LevelType = gameLevels.levels.find(
    (level) => level.id === currentLevel
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
    localStorage.removeItem('gameState');
  };

  const saveState = () => {
    const state = {
      currentLevel,
      countLevel,
      board,
      letters
    };
    localStorage.setItem('gameState', JSON.stringify(state));
  };

  useEffect(() => {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      setCurrentLevel(parsedState.currentLevel);
      setCount(parsedState.countLevel);
      setBoard(parsedState.board);
      setLetters(parsedState.letters);
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
  }, [currentLevel]);

  useEffect(() => {
    window.addEventListener('beforeunload', saveState);

    return () => {
      window.removeEventListener('beforeunload', saveState);
    };
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
        <GameBoard board={board} level={level} />
        <div className="pb-4 h-2 flex justify-center items-center text-white">{previewWord}</div>
        <LetterController
          letters={letters}
          selectedLetters={selectedLetters}
          setPreviewWord={setPreviewWord}
          setSelectedLetters={setSelectedLetters}
          onWordSelected={checkWord}
        />
      </div>
    </main>
  );
};

export default Game;
