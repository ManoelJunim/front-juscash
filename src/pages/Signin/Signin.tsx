import React, { useContext, useState } from 'react';
import {
  Button,
  Divider,
  Grid,
  Input,
  Row,
  Spacer,
  Text,
  Image,
  Loading,
} from '@nextui-org/react';
import { MdLogin } from 'react-icons/md';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import * as CryptoJs from 'crypto-js';

import { colors } from '../../styles/colors';
import * as S from './styles';
import { ISignIn } from './types';
import { SessionContext } from '../../context';
import { toast } from 'react-toastify';

const Signin = () => {
  const { setAuth } = useContext(SessionContext);
  const [loading, setLoading] = useState<boolean>(false);
  const navitega = useNavigate();

  const { handleSubmit, errors, getFieldProps, values } = useFormik<ISignIn>({
    initialValues: {
      login: '',
      password: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      login: Yup.string().required('Campo Obrigatório'),
      password: Yup.string()
        .min(8, 'Mínimo 8 dígitos')
        .required('Campo Obrigatório'),
    }),
    onSubmit: () => {
      setLoading(true);
      if (
        CryptoJs.MD5(values.password).toString() ===
          'ccba41335f2954261403407914c2b105' &&
        CryptoJs.MD5(values.login).toString() ===
          'e3afed0047b08059d0fada10f400c1e5'
      ) {
        setTimeout(() => {
          setAuth(true);
          navitega('/juscash');
          setLoading(false);
        }, 3000);
      } else {
        toast.error('Senha inválida!');
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    },
  });

  return (
    <S.Container>
      <form onSubmit={handleSubmit}>
        <Row>
          <Image src="/logo juscash.png" alt="logo" width="auto" />
        </Row>
        <Row justify="center">
          <Text size={18}>acesse sua conta</Text>
        </Row>
        <Spacer />
        <Row justify="center">
          <Grid xs={12} md={4}>
            <Divider height={2} css={{ color: '#5A5A5A' }} />
          </Grid>
        </Row>
        <Spacer y={3} />
        <Row justify="center">
          <Grid xs={12} md={4}>
            <Input
              labelPlaceholder="Usuário"
              bordered
              css={{
                width: '100%',
                backgroundColor: '#fff',
              }}
              {...getFieldProps('login')}
              helperText={errors.login}
            />
          </Grid>
        </Row>
        <Spacer y={1.6} />
        <Row justify="center">
          <Grid xs={12} md={4}>
            <Input.Password
              labelPlaceholder="Senha"
              clearable
              bordered
              css={{
                width: '100%',
                backgroundColor: '#fff',
              }}
              {...getFieldProps('password')}
              helperText={errors.password}
            />
          </Grid>
        </Row>
        <Spacer y={2} />
        <Row justify="center">
          <Grid xs={12} md={4}>
            <Button
              css={{ width: '100%', backgroundColor: `${colors.seconday}` }}
              iconRight={<MdLogin fontSize={20} />}
              type="submit"
            >
              <Text size={18} color={colors.white}>
                {loading ? <Loading size="sm" /> : 'Entrar'}
              </Text>
            </Button>
          </Grid>
        </Row>
      </form>
    </S.Container>
  );
};

export { Signin };
