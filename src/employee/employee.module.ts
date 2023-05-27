import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { employeeEntity } from './employee.entity';
import { busownerEntity } from 'src/busowner/busowner.entity';
import { customerEntity } from 'src/customer/customer.entity';
import { posterEntity } from 'src/others/poster.entity';
import { JwtModule } from '@nestjs/jwt';
import { empJwtConstants } from './employee.constants';

@Module({
    imports: [
        TypeOrmModule.forFeature([employeeEntity, busownerEntity, customerEntity, posterEntity]),
        JwtModule.register({
            global: true,
            secret: empJwtConstants.secret,
            signOptions: { expiresIn: '600s' },
          }),
    ],
    controllers: [EmployeeController,],
    providers: [EmployeeService,],
})
export class EmployeeModule { }
