import { EmployeeModule } from './employee/employee.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { busownerModule } from './busowner/busowner.module';
import { customerModule } from './customer/customer.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { othersModule } from './others/others.module';

@Module({
  imports: [
    EmployeeModule,
    busownerModule,
    customerModule,
    othersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'containers-us-west-68.railway.app',
      port: 5892,
      username: 'postgres',
      password: 'tenqYOt9fuDeeZuKaaCC',
      database: 'railway',
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
