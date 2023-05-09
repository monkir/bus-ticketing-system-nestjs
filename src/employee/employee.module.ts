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

@Module({
    imports: [TypeOrmModule.forFeature([employeeEntity, busownerEntity, customerEntity])],
    controllers: [
        EmployeeController,],
    providers: [
        EmployeeService,],
})
export class EmployeeModule { }
