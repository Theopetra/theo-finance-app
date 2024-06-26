import useBuyForm from '@/pages/market-cards/state/use-buy-form';
import React, { ReactElement, useEffect } from 'react';
import LottieAnimation from 'react-lottie';
import animationData from './animation-data.json';

const PendingTransaction = ({
  message,
  secondaryMessage,
}: {
  message?: string;
  secondaryMessage?: string | ReactElement;
}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  // const [, { updateFormState }] = useBuyForm();

  // useEffect(() => {
  //   updateFormState({ transactionPending: true });

  //   return () => updateFormState({ transactionPending: false });
  // }, []);

  return (
    <div>
      <div className="text-center text-xl dark:text-white">{message}</div>
      <LottieAnimation options={defaultOptions} />
      <div className="text-center text-xl dark:text-white">{secondaryMessage}</div>
    </div>
  );
};

export default PendingTransaction;
