import 'reflect-metadata';
import { initDataSource } from '~/server/typeorm/database';

const AppDataSource = initDataSource()

AppDataSource.initialize().then(async () => {
    const config = useRuntimeConfig()

}).catch(error => console.log(error))
