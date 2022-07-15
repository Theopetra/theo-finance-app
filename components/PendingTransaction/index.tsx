import { title } from 'process';
import React from 'react';
import LottieAnimation from 'react-lottie';
import animationData from './animation-data.json';

const PendingTransaction = ({ message }: { message?: string }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div>
      <div className="text-center">{message}</div>
      <LottieAnimation options={defaultOptions} />
    </div>
  );
};

export default PendingTransaction;
