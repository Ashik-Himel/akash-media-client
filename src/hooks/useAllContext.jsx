import { useContext } from "react";
import { AllContext } from '../context/ContextProvider'

const useAllContext = () => {
  const context = useContext(AllContext);

  return context;
};

export default useAllContext;