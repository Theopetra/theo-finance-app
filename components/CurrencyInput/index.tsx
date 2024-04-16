import { cleanSymbol } from '@/lib/clean_symbol';
import CurrencySelect, {
  CurrencySelectOptionsType,
  CurrencySelectOptionType,
  iconMap,
} from '../CurrencySelect';
import Icon from '../Icons';

type CurrrencyInputProps = {
  className?: string;
  selectedToken?: CurrencySelectOptionType;
  balance?: string;
  isDiscountBuy?: boolean;
  maxPayout?: number;
  value?: number;
  onChange?: any;
  onCurrencyChange?: any;
  options?: CurrencySelectOptionsType;
  hideValue?: boolean;
};

const CurrencyInput: React.FC<CurrrencyInputProps> = ({
  className,
  balance,
  isDiscountBuy,
  maxPayout,
  selectedToken,
  value,
  onChange,
  onCurrencyChange,
  options,
  hideValue,
}) => {
  return (
    <div
      className={`${className} flex rounded-lg bg-[#ebebeb] dark:bg-theo-dark-navy sm:items-center`}
    >
      {options ? (
        <CurrencySelect
          options={options}
          selected={selectedToken?.symbol}
          onChange={onCurrencyChange}
        />
      ) : (
        <span className=" flex items-center truncate p-2 text-lg font-bold uppercase sm:p-3 sm:text-2xl">
          {/* {selectedToken?.symbol && <Icon name={selectedToken.symbol} className="mr-2 w-8" />} */}
          {selectedToken?.symbol && (
            <img
              src={iconMap[selectedToken.symbol]?.src}
              alt={`${cleanSymbol(selectedToken?.symbol)} icon`}
              className="mr-2 max-h-8 w-8"
            />
          )}
          {cleanSymbol(selectedToken?.symbol)}
        </span>
      )}
      <div className="flex-1 p-2">
        <div className="flex min-h-[40px] items-center rounded-lg bg-white dark:bg-[#262626]">
          {balance ? (
            <div className="hidden p-2 text-xs sm:block">
              {!hideValue && (
                <>
                  Balance: {Number(balance).toFixed(selectedToken?.symbol === 'USDC' ? 2 : 4)}
                  {cleanSymbol(selectedToken?.symbol)}
                </>
              )}
              <span
                onClick={() =>
                  Number(balance) > Number(maxPayout) && isDiscountBuy === true
                    ? onChange({ target: { value: Number(maxPayout) } }, 'purchasePrice')
                    : onChange({ target: { value: (Number(balance) - 0.015) } }, 'purchasePrice')
                }
                className="ml-2 cursor-pointer rounded bg-theo-navy p-1 text-[10px] font-bold uppercase text-white"
              >
                max
              </span>
            </div>
          ) : (
            <></>
          )}
          {/*  */}
          <input
            type="number"
            value={value}
            onChange={onChange}
            className="w-full flex-1 bg-transparent pr-2 text-right [appearance:textfield] hover:appearance-none focus:outline-none"
            placeholder="00.00"
            onKeyPress={(event) => {
              if (!/^\d*\.?\d*$/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          <div className="pl-2 pr-4">{cleanSymbol(selectedToken?.symbol)}</div>
        </div>
        <div className="p-2 text-right text-xs sm:hidden">
          Balance: {balance}
          {selectedToken?.symbol}
          <span className="ml-2 cursor-pointer rounded bg-theo-navy p-1 text-[10px] font-bold uppercase text-white">
            max
          </span>
        </div>
      </div>
    </div>
  );
};

export default CurrencyInput;
