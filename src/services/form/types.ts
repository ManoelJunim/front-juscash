export interface IJuscashData {
    assunto_processo:   IAssuntoProcesso[];
    reu_ajustado:       IReuAjustado[];
    unidade_judiciaria: IUnidadeJudiciaria[];
  }
  
  export interface IAssuntoProcesso {
    indice_assunto: number;
    nome_assunto:   string;
  }
  
  export interface IReuAjustado {
    classe:     IClasse[];
    indice_reu: number;
    nome:       string;
  }
  
  export interface IClasse {
    classe_id:     number;
    nome_classe:    string;
   
  }
  
  export interface IUnidadeJudiciaria {
    indice_judiciaria:       number;
    nome_unidade_judiciaria: string;
  }

  export interface IPayloadPrediction{
    assuntoProcesso : string;
    classeReu : string;
    dataConclusao : string,
    dataInicio : string,
    dataResposta : string,
    reuAjustado : string;
    unidadeJuridica :string;
    numProcesso: string;
  }