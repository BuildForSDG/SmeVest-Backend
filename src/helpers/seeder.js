import { Seeder } from 'mongo-seeding';
import path from 'path';

const seederConfig = {
  database: {
    name: 'smevest'
  },
  dropDatabase: true
};
const seeder = new Seeder(seederConfig);
const collections = seeder.readCollectionsFromPath(
  path.resolve('../models'),
  {
    transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId]
  }
);

seeder
  .import(collections)
  .then(() => {
    console.log('Success');
  })
  .catch((err) => {
    console.log('Error', err);
  });
