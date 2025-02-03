import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { RedisModule } from '@booleash/redis';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'node:path';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(
        process.cwd(),
        'apps/booleash-server/src/assets/schema.gql'
      ),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    RedisModule.forRoot({
      url: 'redis://localhost:16379',
    }),
  ],
  controllers: [AppController],
  providers: [AppResolver, AppService],
})
export class AppModule {
  constructor() {
    Logger.log('process.cwd():', process.cwd());
  }
}
