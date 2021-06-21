import firebase from "firebase/app";
import React, { ReactElement, useEffect, useState } from "react";
import auth from "../../firebase-auth";

interface AppProperties {
  children: React.ReactNode;
}

// eslint-disable-next-line unicorn/no-null
export const SessionContext = React.createContext<firebase.User | null>(null);

export const SessionProvider = ({ children }: AppProperties): ReactElement => {
  // eslint-disable-next-line unicorn/no-null
  const [user, setUser] = useState<firebase.User | null>(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return (
    <SessionContext.Provider value={user}>{children}</SessionContext.Provider>
  );
};
