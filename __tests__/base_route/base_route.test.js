import { status, testApiServer, disconnect } from '../../src/utils';

const entryRoute = '/';

// Base Route Test
describe('Base Route Test ', () => {
  it('should return welcome user Welcome to SmeVest server', async () => {
    const response = await testApiServer().get(entryRoute);
    expect(response.status).toBe(status.success);
    expect(response.body.message).toBe('Welcome to SmeVest server');
  });

  it('should return 404 for a non-found route', async () => {
    const response = await testApiServer().get('/badRoute');
    expect(response.status).toBe(status.notfound);
  });

  afterAll(async () => {
    await disconnect();
  });
});
