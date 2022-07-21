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
  Typography,
  Divider
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import {ReactInputMask} from 'react-input-mask';
import { addMonths, format, formatDistanceStrict  } from 'date-fns'


import { Header } from '../../components';
import { withAuth } from '../../hocs';
import * as S from './styles';
import { IFieldsResquest } from '../../util/types';
import { FormServices } from '../../services';
import { IJuscashData, IReuAjustado } from '../../services/form/types';
import { ptBR } from 'date-fns/locale';

const HomeComponent = () => {
  const [data, setData] = useState<IJuscashData | null>(null);
  const [reu, setReu] = useState<string>('');
  const [classe, setClasse] = useState<IReuAjustado | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [prediction, setPrediction] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [ finalTime, setFinalTime] = useState<Date>(new Date())
  const [visible, setVisible] = useState<boolean>(false)

  const setResult = (response : number) => {
    setPrediction(response);
    setFinalTime( addMonths(new Date(values.dataInicio.split('-').join(',')), response))
    setTimeLeft( formatDistanceStrict(  new Date() ,addMonths(new Date(values.dataInicio.split('-').join(',')), response) ,{unit:'month', locale:ptBR } )   )
    setVisible(true)
  }

  const clearFields = () => {
    resetForm();
    setPrediction(0);
    setFinalTime(new Date())
    setTimeLeft('0 meses')
    setVisible(false)
  };

  const handleClasse = (value: string) => {
    setReu( value);
    setFieldValue('reuAjustado', value);
  };

  useEffect(() => {
    setLoading(true);
    const getFormData = async () => {
      const response = await FormServices.getData();
      setData(response);
      setLoading(false);
    };

    getFormData().catch(console.error);
  }, []);

  useEffect(() => {
    const response = data?.reu_ajustado.find(
      (r) => r.indice_reu === +values.reuAjustado
    );
    setClasse(response);
  }, [reu]);

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
      numProcesso: '',
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
      dataConclusao: Yup.string(),
      numProcesso: Yup.string().min(20, 'Número de processo inválido.'),
    }),
    onSubmit: async () => {
      try {
        const response = await FormServices.getPrediction(values);
        setResult(response)  
        toast.success('Predição concluída! 🚀');
      } catch (error: any) {
        toast.error(error);
      }
    },
  });

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <S.Container>
          <Grid xs={12} sm={4}>
            <Col>
              <Row>            
              <TextField label='Número de processo' fullWidth size='small'/>    
              </Row>
              <Spacer y={1} />
              <Row>
                <FormControl fullWidth>
                  <InputLabel>Réu ajustado</InputLabel>
                  <Select
                    value={values.reuAjustado}
                    label="Réu ajustado"
                    onChange={(e) => handleClasse(e.target.value)}
                    size="small"
                    error={!!errors.reuAjustado}
                  >
                    {data?.reu_ajustado.map((n, index) => {
                      return loading ? (
                        <Loading />
                      ) : (
                        <MenuItem key={index} value={n.indice_reu}>
                          <Typography variant="body2">{n.nome}</Typography>
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Row>
              <Spacer y={1} />
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
                    {classe?.classe.map((c, index) => {
                      return (
                        <MenuItem key={index} value={c.classe_id}>
                          <Typography variant="body2">
                            {' '}
                            {c.nome_classe}
                          </Typography>
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Row>
              <Spacer y={1} />
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
                          <Typography variant="body2">
                            {' '}
                            {a.nome_assunto}{' '}
                          </Typography>
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Row>
              <Spacer y={1} />
              <Row>
                <FormControl fullWidth>
                  <InputLabel>Unidade judiciaria</InputLabel>
                  <Select
                    value={values.unidadeJuridica}
                    label="Unidade judiciaria"
                    onChange={(e) =>
                      setFieldValue('unidadeJuridica', e.target.value)
                    }
                    size="small"
                    error={!!errors.unidadeJuridica}
                  >
                    {data?.unidade_judiciaria.map((n, index) => {
                      return (
                        <MenuItem key={index} value={n.indice_judiciaria}>
                          <Typography variant="body2">
                            {' '}
                            {n.nome_unidade_judiciaria}
                          </Typography>
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Row>
              <Spacer y={1} />
              <Row>
                <Grid.Container alignItems="center" justify="flex-end">
                  <Grid>
                    <Text color="#7A7A7A">Data início de cumprimento :</Text>
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
              <Spacer y={1} />
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
              <Spacer y={1} />
              <Row>
                <Grid.Container alignItems="center" justify="flex-end">
                  <Grid>
                    <Text color="#7A7A7A">
                      Data conclusão para a sentença :
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
              <Spacer y={1} />
              <Row justify="space-between">
                <Button
                  size="sm"
                  css={{ borderColor: '#023A51' }}
                  bordered
                  onPress={() => clearFields()}
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
          <Grid xs={12} sm={8} style={{ marginLeft: 15}}>
            <Col >
              <Row justify="space-between" align="center">
                <Typography variant='body1'>
                   Previsão de duração total do processo
                   </Typography>
                <Text b> {visible? `${prediction} meses` : ''} </Text>
              </Row>
              <Divider />
              <Spacer y={0.5}/>
              <Row justify="space-between" align="center">
              <Typography variant='body1'>
                  
                  Tempo restante até a data final do processo
                  </Typography>
                <Text b> {visible? timeLeft : ''} </Text>
              </Row>
              <Divider />
              <Spacer y={0.5}/>
              <Row justify="space-between" align="center">
              <Typography variant='body1'>
                  
                  Data para finalização do processo
                </Typography>
                
                <Text b> {visible? format(finalTime, "dd/MM/yyyy"): ''}  </Text>
              </Row>
              <Divider />
            </Col>
          </Grid>
        </S.Container>
      </form>
    </>
  );
};

const Home = withAuth(HomeComponent);

export { Home };
