import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [DatabaseModule,UserModule, AuthModule, ConfigModule.forRoot()],
  providers: [],
})
export class AppModule {}
