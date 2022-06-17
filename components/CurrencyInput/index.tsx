import CurrencySelect, {
  CurrencySelectOptionsType,
  CurrencySelectOptionType,
} from '../CurrencySelect';
import Icon from '../Icons';

type CurrrencyInputProps = {
  className?: string;
  selectedToken?: CurrencySelectOptionType | null;
  balance?: string;
  value?: number;
  onChange?: any;
  onCurrencyChange?: any;
  options?: CurrencySelectOptionsType;
};

const CurrencyInput: React.FC<CurrrencyInputProps> = ({
  className,
  balance,
  selectedToken,
  value,
  onChange,
  onCurrencyChange,
  options,
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
          {selectedToken && (
            <Icon name={selectedToken?.symbol.toLowerCase()} className="mr-2 w-8" />
          )}

          {selectedToken?.symbol}
        </span>
      )}
      <div className="flex-1 p-2">
        <div className="flex min-h-[40px] items-center rounded-lg bg-white dark:bg-[#262626]">
          {balance ? (
            <div className="hidden p-2 text-xs sm:block">
              Balance: {Number(balance).toFixed(5)}
              {selectedToken?.symbol}
              <span
                onClick={() => onChange({ target: { value: balance } }, 'purchasePrice')}
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
            step={
              selectedToken?.symbol === 'WETH' || selectedToken?.symbol === 'ETH'
                ? '0.00001'
                : '0.01'
            }
            min="0"
            value={value}
            onChange={onChange}
            className="w-full flex-1 bg-transparent pr-2 text-right focus:outline-none"
            placeholder="00.00"
            onKeyPress={(event) => {
              if (!/^\d*\.?\d*$/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          <div className="pr-4 pl-2">{selectedToken?.symbol}</div>
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
