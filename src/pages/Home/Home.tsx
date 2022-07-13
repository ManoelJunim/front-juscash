import React from 'react';
import { Row, Col, Spacer, Text, Button, Grid } from '@nextui-org/react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Header } from '../../components';
import { withAuth } from '../../hocs';
import * as S from './styles';
import { IFieldsResquest } from '../../util/types';

const HomeComponent = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const { handleSubmit, errors, getFieldProps, isSubmitting } =
    useFormik<IFieldsResquest>({
      initialValues: {
        reuAjustado: '',
        classeReu: '',
        assuntoProcesso: '',
        unidadeJuridica: '',
        dataInicio: '',
        dataResposta: '',
        dataConclusao: '',
      },
      validateOnBlur: false,
      validateOnChange: false,
      enableReinitialize: true,
      validationSchema: Yup.object().shape({
        reuAjustado: Yup.string().required('Campo Obrigatório'),
        classeReu: Yup.string().required('Campo Obrigatório'),
        assuntoProcesso: Yup.string().required('Campo Obrigatório'),
        unidadeJuridica: Yup.string().required('Campo Obrigatório'),
        dataInicio: Yup.string().required('Campo Obrigatório'),
        dataResposta: Yup.string().required('Campo Obrigatório'),
        dataConclusao: Yup.string().required('Campo Obrigatório'),
      }),
      onSubmit: async () => {},
    });

  return (
    <>
      <Header />
      <S.Container>
        <Grid xs={4}>
          <Col>
            <Row>
              <FormControl fullWidth>
                <InputLabel>Réu ajustado</InputLabel>
                <Select
                  value={age}
                  label="Réu ajustado"
                  onChange={handleChange}
                  size="small"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Row>
            <Spacer y={1.5} />
            <Row>
              <FormControl fullWidth>
                <InputLabel>Classe réu</InputLabel>
                <Select
                  value={age}
                  label="Classe réu"
                  onChange={handleChange}
                  size="small"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Row>
            <Spacer y={1.5} />
            <Row>
              <FormControl fullWidth>
                <InputLabel>Assunto do processo</InputLabel>
                <Select
                  value={age}
                  label="Assunto do processo"
                  onChange={handleChange}
                  size="small"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Row>
            <Spacer y={1.5} />
            <Row>
              <FormControl fullWidth>
                <InputLabel>Unidade jurídica</InputLabel>
                <Select
                  value={age}
                  label="Unidade jurídica"
                  onChange={handleChange}
                  size="small"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Row>
            <Spacer y={1.5} />
            <Row>
              <Grid.Container alignItems="center" justify="flex-end">
                <Grid>
                  <Text color="#7A7A7A">Data de início de sentença :</Text>
                </Grid>
                <Spacer />
                <Grid xs={4}>
                  <TextField type="date" fullWidth size="small" />
                </Grid>
              </Grid.Container>
            </Row>
            <Spacer y={1.5} />
            <Row>
              <Grid.Container alignItems="center" justify="flex-end">
                <Grid>
                  <Text color="#7A7A7A"> Data de resposta :</Text>
                </Grid>
                <Spacer />
                <Grid xs={4}>
                  <TextField type="date" fullWidth size="small" />
                </Grid>
              </Grid.Container>
            </Row>
            <Spacer y={1.5} />
            <Row>
              <Grid.Container alignItems="center" justify="flex-end">
                <Grid>
                  <Text color="#7A7A7A"> Data de conclusão para a sentença :</Text>
                </Grid>
                <Spacer />
                <Grid xs={4}>
                  <TextField type="date" fullWidth size="small" />
                </Grid>
              </Grid.Container>
            </Row>
            <Spacer y={1.5} />
            <Row justify="space-between">
              
              <Button size="sm" css={{ borderColor: '#023A51' }} bordered>
                <Text color="#023A51">Limpar</Text>
              </Button>
              <Button size="sm" css={{ backgroundColor: '#023A51' }}>
                <Text color="#fff"> Calcular</Text>
              </Button>
            </Row>
          </Col>
        </Grid>
        <Grid xs={8}>
          <Col>
            <Row justify="center">TABELA</Row>
          </Col>
        </Grid>
      </S.Container>
    </>
  );
};

const Home = withAuth(HomeComponent);

export { Home };
