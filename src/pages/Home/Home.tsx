import React from 'react';
import { Row, Col, Input } from '@nextui-org/react';

import { Header } from '../../components';
import { withAuth } from '../../hocs';
import * as S from './styles';

const HomeComponent = () => {
  return (
    <>
      <Header />
      <S.Container>
        <Row>
          <Col>
            <Row>
              <Input />
            </Row>
          </Col>
          <Col>
            <Row>TABELA</Row>
          </Col>
        </Row>
      </S.Container>
    </>
  );
};

const Home = withAuth(HomeComponent);

export { Home };
