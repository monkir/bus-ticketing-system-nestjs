import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { customerController } from "./customer.controller";
import { customerEntity } from "./customer.entity";
import { CustomerService } from "./customer.service";

@Module(
    {
        imports: [TypeOrmModule.forFeature([customerEntity])], 
        controllers: [customerController],
        providers: [CustomerService]
    }
)
export class customerModule{}