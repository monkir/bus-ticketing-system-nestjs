import { EmployeeModule } from './employee/employee.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { busownerModule } from './busowner/busowner.module';
import { customerModule } from './customer/customer.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    EmployeeModule,
    busownerModule,
    customerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'tiger123',
      database: 'bus-ticketing-system',
      autoLoadEntities: true,
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'bus.ticketing.system.atp@gmail.com',
          pass: ''
        }
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
