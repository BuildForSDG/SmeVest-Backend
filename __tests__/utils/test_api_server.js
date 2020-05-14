import supertest from 'supertest';
import server from '../../src/app';

const testApiServer = () => supertest(server);


export default testApiServer;
