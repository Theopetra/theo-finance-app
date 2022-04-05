import useModal from '@/state/ui/theme/hooks/use-modal';

const BuyProcess = () => {
  const [, { closeModal }] = useModal();

  
  return (
    <div>
      <p>
        Are you sure you want to deactivate your account? All of your data will be permanently
        removed. This action cannot be undone.
      </p>
      <button onClick={() => closeModal()}>Deactivate</button>
      <button onClick={() => closeModal()}>Cancel</button>
    </div>
  );
};

export default BuyProcess;
