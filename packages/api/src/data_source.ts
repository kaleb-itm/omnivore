import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { env } from './env'
import { CustomTypeOrmLogger } from './utils/logger'

export const appDataSource = new DataSource({
  type: 'postgres',
  host: env.pg.host,
  port: env.pg.port,
  schema: 'omnivore',
  username: env.pg.userName,
  password: env.pg.password,
  database: env.pg.dbName,
  logging: ['query', 'info'],
  entities: [__dirname + '/entity/**/*{.js,.ts}'],
  subscribers: [__dirname + '/events/**/*{.js,.ts}'],
  namingStrategy: new SnakeNamingStrategy(),
  logger: new CustomTypeOrmLogger(['query', 'info']),
  connectTimeoutMS: 40000, // 40 seconds
  maxQueryExecutionTime: 10000, // 10 seconds
})
