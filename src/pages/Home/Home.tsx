import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Spacer,
  Text,
  Button,
  Grid,
  Loading,
} from '@nextui-org/react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Header } from '../../components';
import { withAuth } from '../../hocs';
import * as S from './styles';
import { IFieldsResquest } from '../../util/types';
import { FormServices } from '../../services';
import { IJuscashData } from '../../services/form/types';


const HomeComponent = () => {
  const [data, setData] = useState<IJuscashData|null>(null)
  const [reu, setReu] = useState<string>('')

  useEffect(() => {
    
    const getFormData = async () => {
      const response = await FormServices.getData();
      setData(response)
    }
  
    getFormData().catch(console.error);
  }, [])

  const setClasse = (value: string) => {
    setReu(value)
    setFieldValue('reuAjustado', value)
  }

  useEffect(()=>{

    const classe = data?.reu_ajustado.find((r)=> r.indice_reu === +values.reuAjustado )

    classe?.classe.map((c)=> setFieldValue('classeReu', c.nome_classe))

  },[reu])

  const {
    handleSubmit,
    errors,
    getFieldProps,
    isSubmitting,
    resetForm,
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
    onSubmit: async () => {
      toast.success('DEU TUDO CERTO FERA!');
    },
  });

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <S.Container>
          <Grid xs={4}>
            <Col>
              <Row>
                  <FormControl fullWidth> 
                  <InputLabel>Réu ajustado</InputLabel>
                  <Select
                    value={values.reuAjustado}
                    label="Réu ajustado"
                    onChange={(e) =>
                      setClasse(e.target.value)
                    }
                    size="small"
                    error={!!errors.reuAjustado}
                  >
                    {data?.reu_ajustado.map((n, index) => {
                      return (
                        <MenuItem key={index} value={n.indice_reu}>
                          {n.nome}
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
                    value={values.classeReu}
                    label="Classe réu"
                    onChange={(e) => setFieldValue('classeReu', e.target.value)}
                    size="small"
                    error={!!errors.classeReu}
                  >
                   <MenuItem  value={values.classeReu}>
                          {values.classeReu}
                    </MenuItem>
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
                    error={!!errors.assuntoProcesso}
                  >
                    {data?.assunto_processo.map((a, index) => {
                      return (
                        <MenuItem key={index} value={a.indice_assunto}>
                          {a.nome_assunto}
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
                    value={values.unidadeJuridica}
                    label="Unidade jurídica"
                    onChange={(e) =>
                      setFieldValue('unidadeJuridica', e.target.value)
                    }
                    size="small"
                    error={!!errors.unidadeJuridica}
                  >
                    {data?.unidade_judiciaria.map((n, index) => {
                      return (
                        <MenuItem key={index} value={n.indice_judiciaria}>
                          {n.nome_unidade_judiciaria}
                        </MenuItem>
                      );
                    })}
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
                    <TextField
                      type="date"
                      fullWidth
                      size="small"
                      {...getFieldProps('dataInicio')}
                      error={!!errors.dataInicio}
                      helperText={errors.dataInicio}
                    />
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
                    <TextField
                      type="date"
                      fullWidth
                      size="small"
                      {...getFieldProps('dataResposta')}
                      error={!!errors.dataResposta}
                      helperText={errors.dataResposta}
                    />
                  </Grid>
                </Grid.Container>
              </Row>
              <Spacer y={1.5} />
              <Row>
                <Grid.Container alignItems="center" justify="flex-end">
                  <Grid>
                    <Text color="#7A7A7A">
                      Data de conclusão para a sentença :
                    </Text>
                  </Grid>
                  <Spacer />
                  <Grid xs={4}>
                    <TextField
                      type="date"
                      fullWidth
                      size="small"
                      {...getFieldProps('dataConclusao')}
                      error={!!errors.dataConclusao}
                      helperText={errors.dataConclusao}
                    />
                  </Grid>
                </Grid.Container>
              </Row>
              <Spacer y={1.5} />
              <Row justify="space-between">
                <Button
                  size="sm"
                  css={{ borderColor: '#023A51' }}
                  bordered
                  onPress={() => resetForm()}
                >
                  <Text color="#023A51">Limpar</Text>
                </Button>
                <Button
                  size="sm"
                  type="submit"
                  css={{ backgroundColor: '#023A51' }}
                >
                  {isSubmitting ? (
                    <Loading />
                  ) : (
                    <Text color="#fff"> Calcular</Text>
                  )}
                </Button>
              </Row>
            </Col>
          </Grid>
          <Grid xs={8}>
            <Col>
              <Row justify="center">Resultado e dados inlustrativos</Row>
            </Col>
          </Grid>
        </S.Container>
      </form>
    </>
  );
};

const Home = withAuth(HomeComponent);

export { Home };
