import useModal from '@/state/ui/theme/hooks/use-modal';

const FauxModal = () => {
  const [{ modalContent }] = useModal();
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="dark:bg-[#000000b3] relative mx-auto w-[88%] rounded-[20px] bg-gradient-to-b from-[#ffffff] to-[#ababab] p-12 shadow dark:bg-none">
        {modalContent}
      </div>
    </div>
  );
};

export default FauxModal;
