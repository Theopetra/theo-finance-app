import CurrencySelect, {
  CurrencySelectOptionsType,
  CurrencySelectOptionType,
} from '../CurrencySelect';

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
    <div className={`${className} flex items-center rounded-lg bg-[#ebebeb] dark:bg-theo-dark-navy`}>
      {options ? (
        <CurrencySelect options={options} selected={selectedCurrency} onChange={onCurrencyChange} />
      ) : (
        <span className="block truncate p-3 text-2xl font-bold uppercase">{selectedCurrency?.name}</span>
      )}

      <div className="flex-1 p-2">
        <div className="flex min-h-[40px] items-center rounded-lg bg-white dark:bg-[#262626]">
          {balance ? (
            <div className="p-2 text-xs">
              Balance: {balance}
              {selectedCurrency?.name}
              <span className="ml-2 cursor-pointer rounded bg-theo-navy p-1 text-[10px] font-bold uppercase text-white">
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
            className="flex-1 text-right focus:outline-none bg-transparent "
            placeholder="00.00"
            onKeyPress={(event) => {
              if (!/^\d*\.?\d*$/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          <div className="pr-4 pl-2">{selectedCurrency?.name}</div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyInput;
