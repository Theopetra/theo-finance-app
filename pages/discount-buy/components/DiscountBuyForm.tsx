import CurrencyInput from '@/components/CurrencyInput';
import Icon from '@/components/Icons';
import useModal from '@/state/ui/theme/hooks/use-modal';
import { BaseSyntheticEvent, useState } from 'react';
import useBuyForm from '../state/use-buy-form';
import ConfirmBuy from './ConfirmBuy';

const DiscountBuyForm = () => {
  const [, { openModal, closeModal }] = useModal();
  const [{ purchasePrice, purchaseAmount, purchaseCurrency, selection }, { handleUpdate }] =
    useBuyForm();
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <button onClick={() => closeModal()} className="text-theo-cyan">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        </div>
        <div
          className="mb-8 text-center text-theo-navy dark:text-white"
          style={{ textShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)' }}
        >
          <div className="mb-4 text-4xl font-bold ">Discount Buy</div>
          <div>Review carefully, this purchase is final</div>
        </div>
        <div>
          <Icon name="intersect" className="h-12 w-12 dark:text-white" />
        </div>
      </div>
      <div className="mb-2 flex justify-between rounded-2xl bg-white p-6 text-center text-theo-navy dark:bg-black dark:text-white">
        <div>
          <div className="text-xl font-bold leading-8 capitalize"> {selection?.level?.value}</div>
          <div className="text-sm">Purchase Type</div>
        </div>
        <div>
          <div className="text-xl font-bold leading-8 ">{selection?.discount?.value} Off</div>
          <div className="text-sm">Market Rate </div>
        </div>
        <div>
          <div className="text-xl font-bold leading-8 ">
            <Icon name="lock-laminated" className="mr-2 h-4 w-4 " />
            {selection?.lockDuration?.value}
          </div>
          <div className="text-sm">Unlocked 05-12-22</div>
        </div>
      </div>
      <div className="mb-7 rounded-2xl bg-white p-6 text-theo-navy dark:bg-black dark:text-white">
        <div className="flex items-center text-xl font-bold leading-8">
          ETH/USDC{' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-2 inline-block h-6 w-6 text-theo-cyan"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          THEO
        </div>
        <p className="mb-8 text-xs">
          Important: New bonds are auto-staked (accrue rebase rewards) and no longer vest linearly
        </p>
        <CurrencyInput
          className={'mb-4'}
          selectedCurrency={purchaseCurrency}
          options={[{ name: 'ETH' }, { name: 'USDC' }]}
          balance="18.34"
          value={purchasePrice}
          onCurrencyChange={(e: BaseSyntheticEvent) => handleUpdate(e, 'purchaseCurrency')}
          onChange={(e: BaseSyntheticEvent) => handleUpdate(e, 'purchasePrice')}
        />
        <CurrencyInput
          selectedCurrency={{ name: 'THEO' }}
          value={purchaseAmount}
          onChange={(e: BaseSyntheticEvent) => handleUpdate(e, 'purchaseAmount')}
        />
      </div>

      <div className="flex w-full items-center">
        <div className="w-1/2  underline dark:text-white">Learn about Discount Buy</div>
        <div className="w-1/2">
          <button className="border-button w-full " onClick={() => openModal(<ConfirmBuy />)}>
            Buy Theo
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountBuyForm;
