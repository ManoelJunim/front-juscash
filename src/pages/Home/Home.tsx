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

  const assunto_processo = {
    '21': 'Outros',
    '17': 'Liquidação / Cumprimento / Execução',
    '15': 'Indenização por Dano Moral',
    '6': 'DIREITO PROCESSUAL CIVIL E DO TRABALHO-Liquidação / Cumprimento / Execução-Obrigação de Fazer / Não Fazer',
    '14': 'Indenização por Dano Material',
    '30': 'Valor da Execução / Cálculo / Atualização',
    '27': 'Rescisão do contrato e devolução do dinheiro',
    '25': 'Prestação de Serviços',
    '13': 'Inclusão Indevida em Cadastro de Inadimplentes',
    '23': 'Perdas e Danos',
    '0': 'Acidente de Trânsito',
    '20': 'Obrigações',
    '24': 'Planos de Saúde',
    '5': 'Contratos Bancários',
    '3': 'Compra e Venda',
    '4': 'Constrição / Penhora / Avaliação / Indisponibilidade de Bens',
    '18': 'Locação de Imóvel',
    '29': 'Telefonia',
    '11': 'Expurgos Inflacionários / Planos Econômicos',
    '8': 'Defeito, nulidade ou anulação',
    '10': 'Espécies de Contratos',
    '26': 'Práticas Abusivas',
    '22': 'Pagamento',
    '2': 'Cheque',
    '16': 'Interpretação / Revisão de Contrato',
    '1': 'Bancários',
    '28': 'Seguro',
    '9': 'Despesas Condominiais',
    '7': 'DIREITO PROCESSUAL CIVIL E DO TRABALHO-Partes e Procuradores-Sucumbência -Honorários Advocatícios',
    '19': 'Nota Promissória',
    '12': 'Inadimplemento',
  };

  const {
    handleSubmit,
    errors,
    getFieldProps,
    isSubmitting,

    setFieldValue,
    values,
  } = useFormik<IFieldsResquest>({
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
                  value={values.reuAjustado}
                  label="Réu ajustado"
                  onChange={(e) => setFieldValue('reuAjustado', e.target.value)}
                  size="small"
                >
                  {Object.entries(assunto_processo).map((n, index) => {
                    return (
                      <MenuItem key={index} value={n[0]}>
                        {n[1]}
                      </MenuItem>
                    );
                  })}
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
                  value={values.assuntoProcesso}
                  label="Assunto do processo"
                  onChange={(e) =>
                    setFieldValue('assuntoProcesso', e.target.value)
                  }
                  size="small"
                >
                  {Object.entries(assunto_processo).map((n, index) => {
                    return (
                      <MenuItem key={index} value={n[0]}>
                        {n[1]}
                      </MenuItem>
                    );
                  })}
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
                  <Text color="#7A7A7A">
                    {' '}
                    Data de conclusão para a sentença :
                  </Text>
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
