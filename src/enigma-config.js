import qixSchema from 'enigma.js/schemas/12.20.0.json';

const backendAdress = process.env.NODE_ENV === 'production' ?
   `${process.env.BACKEND}/app/doc/739db838-dd28-4078-8715-ee9cfcc06c29` : 
   'localhost:19076/app/Shared-Africa-Urbanization';

const enigmaConfig = {
  schema: qixSchema,
  url: `${window.location.protocol.replace('http', 'ws')}${backendAdress}`,
};

export default enigmaConfig;
