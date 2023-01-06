export const ConfirmRow: React.FC<{ title?; value?; subtext? }> = ({ title, value, subtext }) => {
  return (
    <div className="space-between flex items-center rounded-2xl bg-white bg-gradient-to-l from-[#EDEDED] to-[#ffffff] p-4 py-3 shadow dark:from-[#000000] dark:to-[#262626] sm:px-8">
      <div className="flex-1 text-lg text-theo-navy dark:text-white sm:text-xl">{title}</div>
      <div className="text-right">
        <div className="text-lg font-bold dark:text-theo-cyan sm:text-2xl">{value}</div>
        <div className="text-xs text-theo-cyan dark:text-white sm:text-sm">{subtext}</div>
      </div>
    </div>
  );
};
