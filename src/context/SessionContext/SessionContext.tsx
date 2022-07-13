import React, { useState } from 'react';

import { ISessionContext } from './types';

const SessionContext = React.createContext({} as ISessionContext);

const SessionProvider = ({ children }: { children?: React.ReactNode }) => {
  const [auth, setAuth] = useState<boolean>(false);

  return (
    <SessionContext.Provider value={{ auth, setAuth }}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
