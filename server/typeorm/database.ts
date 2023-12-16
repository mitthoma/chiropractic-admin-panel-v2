import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "~/server/typeorm/entity/User";

let AppDataSource: DataSource | null = null;

export function initDataSource() {
  const config = useRuntimeConfig();
  const formattedPort = parseInt(config.public.DB_PORT);
  const dataSourceConfig = {
    host: config.public.DB_HOST,
    port: formattedPort,
    username: config.public.DB_USERNAME,
    password: config.public.DB_PASSWORD,
    database: config.public.DB_DATABASE,
  };

  return getAppDataSource(dataSourceConfig);
}

export function getAppDataSource(config: {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}): DataSource {
  if (!AppDataSource) {
    AppDataSource = new DataSource({
      type: "postgres",
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      synchronize: true,
      logging: false,
      // entities: [entitiesPath],
      entities: [User],
      migrations: [],
      subscribers: [],
    });
  }

  return AppDataSource;
}
