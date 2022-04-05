import useModal from '@/state/ui/theme/hooks/use-modal';

const FauxModal = () => {
  const [{ modalContent }] = useModal();
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative mx-auto max-w-sm  rounded-[20px] bg-gradient-to-b from-[#ffffff] to-[#ababab] p-12 ">
        {modalContent}
      </div>
    </div>
  );
};

export default FauxModal;
