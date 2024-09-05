import { createContext, useState } from "react";

export const ReloadContext = createContext();

export const ReloadProvider = ({ children }) => {
  const [reloadSidebar, setReloadSidebar] = useState(false);

  const triggerReload = () => {
    setReloadSidebar((prev) => !prev); // Toggle to trigger re-fetch
  };

  return (
    <ReloadContext.Provider value={{ reloadSidebar, triggerReload }}>
      {children}
    </ReloadContext.Provider>
  );
};
