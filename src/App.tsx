import { useEffect, useState } from 'react';
import Header from './components/header/header.tsx';
import GameBoard from './components/game-board/game-board.tsx';
import gameLevels from '../src/constants/levels/levels.json';
import LetterController from './components/letter-controller/letter-controller.tsx';
import getMinimalLettersSet from './utils/getMinimalLettersSet.ts';
import { LetterType } from './type/LetterType.ts';

type LevelType = {
  id: number;
  words: string[];
};

function App() {
  const [currentlevel, setCurrentLevel] = useState<number>(1);
  const [letters, setLetters] = useState<LetterType[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [previewWord, setPreviewWord] = useState<string>('');

  const level: LevelType = gameLevels.levels.find(
    (level) => level.id === currentlevel
  ) as LevelType;

  const checkWord = (word: string) => {
    console.log(word);
  };

  useEffect(() => {
    const letters = getMinimalLettersSet(level.words);
    setLetters(
      letters.map((letter, index) => ({
        id: index + 1,
        value: letter
      }))
    );
  }, [currentlevel]);

  useEffect(() => {
    console.log(selectedLetters);
  }, [setSelectedLetters]);

  return (
    <main className="w-screen h-screen bg-color-pickled">
      <div className="p-7">
        <Header
          headerStyle="flex justify-center items-center gap-3"
          textStyle="text-white text-[30px] font-[700]"
          title="Уровень"
          gameLevel={currentlevel}
        />
        <GameBoard words={level.words} />
        <LetterController
          letters={letters}
          previewWord={previewWord}
          selectedLetters={selectedLetters}
          setSelectedLetters={setSelectedLetters}
          setPreviewWord={setPreviewWord}
          onWordSelected={checkWord}
        />
      </div>
    </main>
  );
}

export default App;
