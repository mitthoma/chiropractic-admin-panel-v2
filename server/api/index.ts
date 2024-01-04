import 'reflect-metadata';
import { initDataSource } from '~/server/typeorm/database';

const AppDataSource = initDataSource();

AppDataSource.initialize()
  .then(() => {
    useRuntimeConfig();
  })
  .catch((error) => console.log(error));
