import useBuyForm from '@/pages/discount-buy/state/use-buy-form';
import { title } from 'process';
import React, { useEffect } from 'react';
import LottieAnimation from 'react-lottie';
import animationData from './animation-data.json';

const PendingTransaction = ({
  message,
  secondaryMessage,
}: {
  message?: string;
  secondaryMessage?: string;
}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const [{ transactionPending, formState }, { setFormState }] = useBuyForm();

  useEffect(() => {
    setFormState({ ...formState, transactionPending: true });

    return () => setFormState({ ...formState, transactionPending: false });
  }, []);

  return (
    <div>
      <div className="text-center dark:text-white text-xl">{message}</div>
      <LottieAnimation options={defaultOptions} />
      <div className="text-center dark:text-white text-xl">{secondaryMessage}</div>
    </div>
  );
};

export default PendingTransaction;
