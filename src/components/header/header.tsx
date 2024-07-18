import { FC } from 'react';

interface HeaderProps {
  title: string;
  headerStyle?: string;
  textStyle?: string;
  gameLevel?: number;
}

const Header: FC<HeaderProps> = ({ title, headerStyle, textStyle, gameLevel }) => {
  return (
    <header className={headerStyle}>
      <span className={textStyle}>{title}</span>
      {gameLevel && <span className={textStyle}>{gameLevel}</span>}
    </header>
  );
};

export default Header;
