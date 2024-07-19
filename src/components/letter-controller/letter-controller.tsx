import { FC, useState } from 'react';
import { LetterType } from '../../type/LetterType.ts';

interface LetterControllerProps {
  letters: LetterType[];
  selectedLetters: string[];
  setSelectedLetters: (...args: any) => void;
  setPreviewWord: (...args: any) => void;
  onWordSelected: (word: string) => void;
}

const LetterController: FC<LetterControllerProps> = ({
  letters,
  selectedLetters,
  setSelectedLetters,
  setPreviewWord,
  onWordSelected
}) => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [selectedLettersIndex, setSelectedIndex] = useState<number[]>([]);
  const angle = 360 / letters.length;

  const handleDragStart = (letter: LetterType) => {
    setSelectedLetters([letter.value]);
    setPreviewWord(letter.value);
    setSelectedIndex([letter.id]);
    setDragging(true);
  };

  const handleDragOver = (event: React.DragEvent, letter: LetterType) => {
    event.preventDefault();
    if (dragging && !selectedLettersIndex.includes(letter.id)) {
      setSelectedLetters([...selectedLetters, letter.value]);
      setSelectedIndex([...selectedLettersIndex, letter.id]);
    }
    if (dragging && letter.id === selectedLettersIndex[selectedLetters.length - 1 - 1]) {
      setSelectedLetters((prevLetters: string) => prevLetters.slice(0, -1));
      setSelectedIndex((prevIndexes) => prevIndexes.slice(0, -1));
    }
    setPreviewWord(selectedLetters.join(''));
  };

  const handleDragEnd = () => {
    if (selectedLetters.length > 0) {
      onWordSelected([...selectedLetters].join(''));
    }
    setPreviewWord('');
    setSelectedLetters([]);
    setSelectedIndex([]);
    setDragging(false);
  };

  return (
    <div className="relative flex justify-center items-center flex-col mx-auto mt-1">
      <div className="relative w-36 h-36 rounded-full border-8 border-color-fiord">
        {letters.map((letter, index) => {
          let classes = `absolute uppercase w-10 h-10 ${!selectedLettersIndex.includes(letter.id) ? ' bg-white' : 'bg-pink-500'} ${!selectedLettersIndex.includes(letter.id) ? ' text-black' : 'text-white'} hover:bg-pink-500 hover:text-white transition duration-150 ease-out hover:ease-in rounded-full flex items-center justify-center cursor-pointer text-xl font-bold`;

          return (
            <button
              key={index}
              className={classes}
              style={{
                transform: `rotate(${index * angle}deg) translate(70px) rotate(-${index * angle}deg)`,
                top: '40%',
                left: '38%',
                transformOrigin: '0 0'
              }}
              draggable
              onDragStart={handleDragStart.bind(this, letter)}
              onDragOver={(event) => handleDragOver(event, letter)}
              onDragEnd={handleDragEnd}>
              {letter.value}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LetterController;
