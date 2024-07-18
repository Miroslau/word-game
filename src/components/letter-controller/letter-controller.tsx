import { FC } from 'react';

interface LetterControllerProps {
  letters: string[];
}

const LetterController: FC<LetterControllerProps> = ({ letters }) => {
  const angle = 360 / letters.length;

  return (
    <div className="relative flex justify-center items-center mx-auto mt-8">
      <div className="relative w-48 h-48 rounded-full border-8 border-blue-500">
        {letters.map((letter, index) => (
          <div
            key={index}
            className="absolute uppercase w-12 h-12 bg-white text-black hover:bg-pink-500 hover:text-white transition duration-150 ease-out hover:ease-in rounded-full flex items-center justify-center cursor-pointer text-xl font-bold"
            style={{
              transform: `rotate(${index * angle}deg) translate(90px) rotate(-${index * angle}deg)`,
              top: '40%',
              left: '38%',
              transformOrigin: '0 0'
            }}>
            {letter}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LetterController;
