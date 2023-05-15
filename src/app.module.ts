import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppResolver } from './app.resolver';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
   GraphQLModule.forRoot({
    driver: ApolloDriver,
    playground: true,   //where all graphQL queries will be tested
    autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),    //to generate automatic schemas by NestJs or by typescript
    definitions: {  //to genrate automatic interfaces
      path: join(process.cwd(), 'src/graphql.ts'),
    }
    // typePaths: ['./**/*.graphql'], //the path where my schema will be strored
  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'book_db',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
  AuthModule, UserModule ],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule {}
