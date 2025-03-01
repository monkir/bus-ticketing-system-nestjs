import { EmployeeModule } from './employee/employee.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { busownerModule } from './busowner/busowner.module';
import { customerModule } from './customer/customer.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { othersModule } from './others/others.module';
import { ConfigModule } from '@nestjs/config';
import { BtmsDbConfig } from './BtmsDbConfig';

console.log(BtmsDbConfig);
@Module({
  imports: [
    ConfigModule.forRoot(),
    EmployeeModule,
    busownerModule,
    customerModule,
    othersModule,
    TypeOrmModule.forRoot(process.env.DATABASE_URL
      ? {
          type: 'postgres',
          url: process.env.DATABASE_URL,
          autoLoadEntities: true,
          synchronize: true,
      }
      : {
          type: 'postgres',
          host: process.env.DATABASE_HOST,
          port: Number(process.env.DATABASE_PORT),
          username: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_DATABASE,
          autoLoadEntities: true,
          synchronize: true,
      }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
