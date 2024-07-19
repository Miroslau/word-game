import Game from './components/game/game.tsx';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Modal from './components/portal/modal.tsx';

function App() {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [sessionId, _] = useState<string>(uuidv4());

  const handleRefresh = () => {
    setIsActive(true);
    localStorage.setItem('activeSession', sessionId);
    window.location.reload();
  };

  useEffect(() => {
    localStorage.setItem('activeSession', sessionId);

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'activeSession' && event.newValue !== sessionId) {
        setIsActive(false);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        localStorage.setItem('activeSession', sessionId);
        setIsActive(true);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [sessionId]);

  return (
    <div>
      {!isActive && (
        <Modal>
          <div className="text-center w-60">
            <div className="mx-auto my-4 w-52">
              <h3 className="text-lg font-black">Две вкладки с игрой?</h3>
              <p className="text-sm text-gray-500">
                Похоже, игра открыта в нескольких вкладках браузера. Чтобы продолжить играть в этой
                вкладке, обновите страницу.
              </p>
            </div>
            <button
              onClick={handleRefresh}
              className="bg-green-500 hover:bg-green-700 active:bg-green-800 px-4 py-2 rounded-md text-white">
              Обновить
            </button>
          </div>
        </Modal>
      )}
      <Game />
    </div>
  );
}

export default App;
