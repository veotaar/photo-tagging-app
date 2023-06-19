import { Ripples } from '@uiball/loaders';

const Loading: React.FC = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black">
      <Ripples size={45} speed={2} color="white" />
    </div>
  );
};

export default Loading;
