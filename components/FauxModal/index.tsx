import useModal from '@/state/ui/theme/hooks/use-modal';

const FauxModal = () => {
  const [{ modalContent }] = useModal();
  return (
    <div className="faux absolute inset-0 z-40 flex min-h-screen justify-center pt-1 bg-gray-100 dark:bg-[#262626] lg:items-center">
      <div className="w-[88%]">
        <div className="relative mx-auto  rounded-[20px] bg-gradient-to-b from-[#ffffff] to-[#ababab] p-12 shadow dark:bg-[#000000b3] dark:bg-none">
          {modalContent}
        </div>
      </div>
    </div>
  );
};

export default FauxModal;
