import useModal from '@/state/ui/theme/hooks/use-modal';

const FauxModal = () => {
  const [{ modalContent }] = useModal();
  return (
    <div className="faux absolute inset-0 z-40 flex min-h-screen justify-center bg-gray-100 pt-1 dark:bg-[#262626] lg:items-center">
      <div className="w-full sm:w-[88%]">
        <div className="relative mx-auto  rounded-[20px] bg-gradient-to-b from-[#ffffff] to-[#ababab] p-4 shadow dark:bg-[#000000b3] dark:bg-none sm:p-12">
          {modalContent}
        </div>
      </div>
    </div>
  );
};

export default FauxModal;
