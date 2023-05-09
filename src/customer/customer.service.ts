import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { customerEntity } from "./customer.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomerService{
    constructor(
        @InjectRepository(customerEntity)
        private custRepo: Repository<customerEntity>,
        private mailerService: MailerService
    ){}
    async login(loginDTO):Promise<boolean>
    { 
       if(await this.custRepo.count({where: {email: loginDTO.email}})==0){
        
       console.log(loginDTO.password)
        return false;
       }
       const tableData= await this.custRepo.findOneBy({email: loginDTO.email})
       console.log(tableData.password)
       console.log(loginDTO.password)
       return bcrypt.compare(loginDTO.password, tableData.password)
    }
}