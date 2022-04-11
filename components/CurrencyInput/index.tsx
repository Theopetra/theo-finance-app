import { BaseSyntheticEvent } from 'react';

type CurrrencyInputProps = {
  className?: string;
  tokenSymbol?: string;
  balance?: string;
  value?: number;
  onChange?: any;
};

const CurrencyInput: React.FC<CurrrencyInputProps> = ({
  className,
  balance,
  tokenSymbol,
  value,
  onChange,
}) => {
  return (
    <div className={`${className} flex items-center rounded-lg bg-[#ebebeb]`}>
      <div className="p-3 text-2xl font-bold">{tokenSymbol}</div>

      <div className="flex-1 p-2">
        <div className="flex min-h-[40px] items-center rounded-lg bg-white">
          {balance ? (
            <div className="p-2 text-xs">
              Balance: {balance}
              {tokenSymbol}
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
            className="flex-1 text-right focus:outline-none"
            placeholder="00.00"
            onKeyPress={(event) => {
              if (!/^\d*\.?\d*$/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          <div className="pr-4 pl-2">{tokenSymbol}</div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyInput;
