import { useEffect, useState } from 'react';
import Header from './components/header/header.tsx';
import GameBoard from './components/game-board/game-board.tsx';
import gameLevels from '../src/constants/levels/levels.json';

type LevelType = {
  id: number;
  words: string[];
};

function App() {
  const [currentlevel, setCurrentLevel] = useState<number>(1);
  const [letters, setLetters] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);

  const level: LevelType = gameLevels.levels.find(
    (level) => level.id === currentlevel
  ) as LevelType;

  useEffect(() => {
    const letters = level.words
      .join('')
      .split('')
      .sort(() => Math.random() - 0.5);
    console.log(letters);
    setLetters(letters);
  }, [currentlevel]);

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
      </div>
    </main>
  );
}

export default App;
