import { useContext } from "react";
import { ModalContext } from "../providers";

export const useModal = () => {
  const [state, dispatch] = useContext(ModalContext);

  return [state, dispatch];
};

export default useModal;
