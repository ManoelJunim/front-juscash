import React, { useContext } from 'react';
import { Button, Tooltip } from '@nextui-org/react';
import { MdLogout } from 'react-icons/md';

import * as S from './styles';
import { SessionContext } from '../../context';

const Header = () => {
  const { setAuth } = useContext(SessionContext);

  return (
    <S.Container align="center" justify="space-between">
      <img src="/logo juscash.png" alt="logo" width="100px" height="auto" />
      <Tooltip color="default" content="Sair" placement="bottom">
        <Button
          icon={<MdLogout fontSize={20} color="#023A51" />}
          light
          size="xs"
          onPress={() => setAuth(false)}
        />
      </Tooltip>
    </S.Container>
  );
};

export { Header };
