import cn from 'classnames';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import censor from '../utils/profanity';
import { useGameDispatch } from '../contexts/GameProvider';
import { db } from '../config/firebase';

interface ResultProps {
  duration: number;
  isVisible: boolean;
  updateMessage: (message: string, success: boolean) => void;
  restart: () => void;
  showInitialPage: () => void;
}

interface Action {
  type: string;
}

const ResultScreen: React.FC<ResultProps> = ({ duration, isVisible, restart, updateMessage, showInitialPage }) => {
  const [playerName, setPlayerName] = useState('');

  const leaderboard = collection(db, 'leaderboard');

  const dispatch = useGameDispatch() as React.Dispatch<Action>;

  const handleRestart = () => {
    restart();
    updateMessage(`Good luck!`, true);
    dispatch({ type: 'reset' });
    setPlayerName('');
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPlayerName(e.target.value);
  };

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    if (playerName.length < 3) return;
    const filteredName = censor(playerName);
    const data = { user: filteredName, time: duration, recordId: uuidv4() };
    await addDoc(leaderboard, data);

    updateMessage(`Successfully sent your time!`, true);
    dispatch({ type: 'reset' });
    setPlayerName('');
    showInitialPage();
  };

  return (
    <div className={cn({ hidden: !isVisible }, 'mx-auto flex h-full w-64 flex-col justify-center gap-2 text-zinc-50')}>
      <p className="text-xl">
        Your time: <span className="text-emerald-400">{duration} ms</span>{' '}
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-lg">
        {/* eslint-disable jsx-a11y/label-has-associated-control */}
        <label htmlFor="player-name">Enter your name:</label>
        <input
          id="player-name"
          type="text"
          className="rounded border-slate-300 bg-zinc-800 text-lg text-zinc-50 focus:ring-2 focus:ring-white"
          value={playerName}
          minLength={3}
          onChange={handleChange}
        />

        {/* eslint-enable jsx-a11y/label-has-associated-control */}

        <button
          type="submit"
          className="rounded border border-zinc-50 bg-zinc-50 px-2 py-2 text-zinc-950 hover:bg-zinc-200"
        >
          Submit
        </button>
      </form>
      <p className="text-center">or</p>
      <button
        type="button"
        onClick={handleRestart}
        className="self-stretch rounded border border-zinc-50 p-2 text-lg text-zinc-50 hover:bg-zinc-50 hover:text-zinc-950"
      >
        Play Again
      </button>
    </div>
  );
};

export default ResultScreen;
