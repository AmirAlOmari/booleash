import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { RedisModule } from '@booleash/redis';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'node:path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeatureToggleModule } from './feature-toggle/feature-toggle.module';

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
      // TODO(amir): `any`? 🤷
      plugins: [ApolloServerPluginLandingPageLocalDefault() as any],
    }),
    RedisModule.forRoot({
      url: 'redis://localhost:16379',
    }),

    FeatureToggleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    Logger.log('process.cwd():', process.cwd());
  }
}
