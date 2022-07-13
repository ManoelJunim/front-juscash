import React from 'react';
import { withAuth } from '../../hocs';

import * as S from './styles';

const HomeComponent = () => {
  return <S.Container> Home </S.Container>;
};

const Home = withAuth(HomeComponent);

export { Home };
