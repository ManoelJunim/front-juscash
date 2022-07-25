import React, { Fragment } from 'react';
import { Routes as Switch, Route } from 'react-router-dom';

import { Home, Signin } from '../pages';

const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Route path="/juscash" element={<Home />} />
        <Route path="/juscash/signin" element={<Signin />} />
      </Switch>
    </Fragment>
  );
};

export { Routes };
