import qixSchema from 'enigma.js/schemas/12.20.0.json';
import {APP_NAME, APP_ID} from "./constants";

const backendAdress = process.env.NODE_ENV === 'production' ?
   `${process.env.BACKEND}/app/doc/${APP_ID}` : 
   `localhost:19076/app/${APP_NAME}`;

const enigmaConfig = {
  schema: qixSchema,
  url: `${window.location.protocol.replace('http', 'ws')}${backendAdress}`,
};

export default enigmaConfig;
