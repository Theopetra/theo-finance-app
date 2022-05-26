import CurrencySelect, {
  CurrencySelectOptionsType,
  CurrencySelectOptionType,
} from '../CurrencySelect';
import Icon from '../Icons';

type CurrrencyInputProps = {
  className?: string;
  selectedCurrency?: CurrencySelectOptionType;
  balance?: string;
  value?: number;
  onChange?: any;
  onCurrencyChange?: any;
  options?: CurrencySelectOptionsType;
};

const CurrencyInput: React.FC<CurrrencyInputProps> = ({
  className,
  balance,
  selectedCurrency,
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
        <CurrencySelect options={options} selected={selectedCurrency} onChange={onCurrencyChange} />
      ) : (
        <span className=" flex items-center truncate p-2 text-lg font-bold uppercase sm:p-3 sm:text-2xl">
          {selectedCurrency && (
            <Icon name={selectedCurrency?.symbol.toLowerCase()} className="mr-2 w-8" />
          )}

          {selectedCurrency?.symbol}
        </span>
      )}

      <div className="flex-1 p-2">
        <div className="flex min-h-[40px] items-center rounded-lg bg-white dark:bg-[#262626]">
          {balance ? (
            <div className="hidden p-2 text-xs sm:block">
              Balance: {balance}
              {selectedCurrency?.symbol}
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
          <input
            type="text"
            value={value}
            onChange={onChange}
            className="w-full flex-1 bg-transparent text-right focus:outline-none"
            placeholder="00.00"
            onKeyPress={(event) => {
              if (!/^\d*\.?\d*$/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          <div className="pr-4 pl-2">{selectedCurrency?.symbol}</div>
        </div>
        <div className="p-2 text-right text-xs sm:hidden">
          Balance: {balance}
          {selectedCurrency?.symbol}
          <span className="ml-2 cursor-pointer rounded bg-theo-navy p-1 text-[10px] font-bold uppercase text-white">
            max
          </span>
        </div>
      </div>
    </div>
  );
};

export default CurrencyInput;
