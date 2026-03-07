"use client";

import { store, persistor } from "@/store";
import { ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const ReduxProvider = ({ children }: { children: ReactNode }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Render children on server, but wrap with PersistGate on client
  if (!isClient) {
    return <Provider store={store}>{children}</Provider>;
  }

  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        onBeforeLift={() => {
          // Optional: Handle any errors during hydration
          // console.log("Redux state rehydrated from localStorage");
        }}
      >
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
