import { createContext, useContext, useState } from "react";

const CommonContext = createContext();

export const useCommonContext = () => {
  return useContext(CommonContext);
};

export const CommonProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <CommonContext.Provider value={{ loading, setLoading }}>
      {children}
    </CommonContext.Provider>
  );
};

export default CommonContext;
