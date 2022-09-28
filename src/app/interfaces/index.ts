export interface responseRegistros{
  registros: Registros[];
}

export interface Registros{
   format : string;
   text : string;
   type : string;
   icon : string;
   created : Date;
}
