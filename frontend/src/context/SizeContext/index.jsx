import { createContext, useMemo, useState } from "react";

export const SizeContext = createContext({
  sizes: [],
  setSizes: () => {},
});

function SizeContextProvider({ children }) {
  const [sizes, setSizes] = useState([]);
  const [refs, setRefs] = useState([]);

  const contextValue = useMemo(
    () => ({
      sizes,
      setSizes,
      refs,
      setRefs,
    }),
    [sizes, refs],
  );

  return (
    <SizeContext.Provider value={contextValue}>{children}</SizeContext.Provider>
  );
}

export default SizeContextProvider;
