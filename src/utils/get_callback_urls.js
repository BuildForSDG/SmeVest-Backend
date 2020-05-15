import config from '../config';

const testEnvironment = !(config.development || config.staging || config.production);
const productionEnvironment = (config.production) || (config.staging);
let baseUrl;

if (productionEnvironment) {
  baseUrl = '';
} else {
  baseUrl = 'http://localhost:4000/api/v1';
}
export default {
  baseUrl,
  testEnvironment
};
