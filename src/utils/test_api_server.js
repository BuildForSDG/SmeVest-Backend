import supertest from 'supertest';
import server from '../app';

const testApiServer = () => supertest(server);


export default testApiServer;
