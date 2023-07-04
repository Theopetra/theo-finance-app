import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import EthIcon from '../../public/assets/icons/eth.svg';
import UdcIcon from '../../public/assets/icons/usdc.svg';
import { TokenInfo } from '../TokenName';
import { cleanSymbol } from '@/lib/clean_symbol';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

export type CurrencySelectOptionType = {
  symbol?: string | undefined;
  address?: string | undefined;
  quoteToken?: `0x${string}` | undefined;
};
export type CurrencySelectOptionsType = CurrencySelectOptionType[];

export type CurrencySelectProps = {
  options: CurrencySelectOptionsType;
  selected;
  onChange;
};

export const iconMap = {
  ETH: EthIcon,
  WETH: EthIcon,
  USDC: UdcIcon,
};

const CurrencySelect: React.FC<CurrencySelectProps> = ({ options, selected, onChange }) => {
  return (
    <Listbox value={selected} onChange={(value) => onChange({ target: { value } })}>
      <div className="relative z-10 mt-1">
        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-transparent pl-1 pr-4 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-1 focus-visible:ring-offset-orange-300 sm:pl-3 sm:pr-10 sm:text-sm">
          <span className=" flex items-center truncate py-2 text-lg font-bold uppercase sm:py-3 sm:text-2xl">
            <img
              src={iconMap[selected]?.src}
              alt={`${cleanSymbol(selected?.symbol)} icon`}
              className="mr-2 max-h-8 w-8"
            />
            {cleanSymbol(selected)}&nbsp;
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center sm:pr-6">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-48 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option, optionIdx) => {
              const token = option?.quoteToken && TokenInfo(option?.quoteToken);

              return (
                token && (
                  <Listbox.Option
                    key={optionIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      }`
                    }
                    value={{ ...option, ...token }}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                        >
                          {cleanSymbol(token?.symbol)}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                )
              );
            })}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default CurrencySelect;
