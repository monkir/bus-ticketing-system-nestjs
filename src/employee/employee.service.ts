/*
https://docs.nestjs.com/providers#services
*/

import { MailerModule, MailerService } from '@nestjs-modules/mailer/dist';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { busownerEntity } from 'src/busowner/busowner.entity';
import { customerEntity } from 'src/customer/customer.entity';
import { ForbiddenTransactionModeOverrideError, Like, Repository } from 'typeorm';
import { employeeEntity } from './employee.entity';
import * as bcrypt from 'bcrypt';
import { randomInt } from 'crypto';
import { posterEntity } from 'src/others/poster.entity';
import { JwtService } from '@nestjs/jwt';
import { addCustomerForm } from './employee.dto';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(employeeEntity)
        private empRepo: Repository<employeeEntity>,
        @InjectRepository(busownerEntity)
        private busRepo: Repository<busownerEntity>,
        @InjectRepository(customerEntity)
        private custRepo: Repository<customerEntity>,
        @InjectRepository(posterEntity)
        private posterRepo: Repository<posterEntity>,
        private mailerService: MailerService,
        private jwtService: JwtService
    ){}
    getIndex():any
    {
        //return "this is employee panel";
        return this.empRepo.find()
    }
    async signup(signupDTO):Promise<any>
    {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(signupDTO.password,salt);
        signupDTO.password=hash;
        try{
            return this.empRepo.insert(signupDTO)
        }
        catch(e){
            console.log(e);
            return {message: "error"};
        }
    }
    async getDataByEmpEmail(email)
    {
        return await this.empRepo.findOneBy({email:email});
    }
    async login(loginDTO):Promise<any>
    { 
    //    if(await this.empRepo.count({where: {email: loginDTO.email}})==0){
    //     return false;
    //    }
    //    const tableData= await this.empRepo.findOneBy({email: loginDTO.email})
    //    return bcrypt.compare(loginDTO.password, tableData.password)
        if(await this.empRepo.count({where: {email: loginDTO.email}})==0)
        {
        throw new UnauthorizedException;
        }
        const tableData= await this.empRepo.findOneBy({email: loginDTO.email})
        if(!bcrypt.compare(loginDTO.password, tableData.password))
        {
            throw new UnauthorizedException;
        }
        const payload = { usertype: "employee", email: loginDTO.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
            email: tableData.email,
            name: tableData.name,
            image: tableData.filename
        };
    }
    async EmpgetIDbyEmail(email):Promise<string>
    { 
        const tableData= await this.empRepo.findOneBy({email: email})
        return tableData.id.toString()
    }
    async CustgetIDbyEmail(email):Promise<string>
    { 
        const tableData= await this.custRepo.findOneBy({email: email})
        return tableData.id.toString()
    }
    async showcustomers():Promise<any>
    {
        //return "employee trying to find customer with id: "+findCustomerDto.id;
        return await this.custRepo.find()
    }
    showbusowners():any
    {
        //return "employee trying to find customer with id: "+findCustomerDto.id;
        return this.busRepo.find();
    }
    findcustomer(findCustomerDto):any
    {
        //return "employee trying to find customer with id: "+findCustomerDto.id;
        return this.custRepo.findOneBy({id:findCustomerDto.id});
    }
    findbusowner(findBusProviderDTO):any
    {
        //return "employee trying to find bus provider with id: "+findBusProviderDTO.id;
        return this.busRepo.findOneBy({id:findBusProviderDTO.id})
    }
    makepass(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        console.log("Password: "+result);
        return result;
    }
    async addcustomer(addCustomerDTO):Promise<any>
    {
        const pass = this.makepass(8)
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(pass,salt);
        addCustomerDTO.password=hash;
        try{
            return {
                message: "success",
                rowdata: await this.custRepo.insert(addCustomerDTO)
            }
        }
        catch(e){
            return {
                message: "failed",
                error: e.detail
            }
        }
        
    }
    async updatecustomer(updateCustomerDTO):Promise<any>
    {
        // return "Employee is updating a customer with id: "+updateCustomerDTO.id
        // +" name: "+updateCustomerDTO.name+" email: "+updateCustomerDTO.email
        // +" phone: "+updateCustomerDTO.phone;
    //     const pass = updateCustomerDTO.password
    //    const salt = await bcrypt.genSalt();
    //     const hash = await bcrypt.hash(pass,salt);
    //     updateCustomerDTO.password=hash;
        // await this.mailerService.sendMail({
        //     to: updateCustomerDTO.email,
        //     subject: 'Updated Password of your account in Bus Ticketing System',
        //     text: 'Welcome to Bus Ticketing System\n'+
        //         'Your account is: '+updateCustomerDTO.email+'\n'+
        //         'Your password is: '+pass+
        //         'Your name is: '+updateCustomerDTO.name+
        //         'Your phone is: '+updateCustomerDTO.phone+
        //         'Your address is: '+updateCustomerDTO.address+
        //         'Your employee is: '+updateCustomerDTO.employee
        // })
        console.log('test')
        return this.custRepo.update(updateCustomerDTO.id, updateCustomerDTO)
    }
    deletecustomer(deleteCustomerDTO):any
    {
        //return "Employee is deleting a customer with id: "+deleteCustomerDTO.id
        return this.custRepo.delete(deleteCustomerDTO.id)
    }
    async addbusowner(addbusownerDTO):Promise<any>
    {
        // return "Employee is adding a bus owner with name: "+addbusownerDTO.name
        // +" brta-license: "+addbusownerDTO.brtalicense
        const pass = this.makepass(8)
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(pass,salt);
        addbusownerDTO.password=hash;
        return this.busRepo.insert(addbusownerDTO)
    }
    updatebusowner(updatebusownerDTO):any
    {
        return this.busRepo.update(updatebusownerDTO.id, updatebusownerDTO)
    }
    deletebusowner(deleteBusOwnerDTO):any
    {
        return this.busRepo.delete(deleteBusOwnerDTO.id)
    }
    async sendmail():Promise<any>
    {
        return await this.mailerService.sendMail({
            to: 'monkirchowdhury@gmail.com',
            subject: 'Bus Ticketing System',
            text: 'Welcome to Bus Ticketing System'
        })
    }
    async searchCustomer(search):Promise<any>{
        search="%"+search+"%";
        return await this.custRepo.find({
            where:
            [
                {name: Like(search)},
                {email: Like(search)},
                {phone: Like(search)},
                {address: Like(search)},
            ]
        }
            );
        // return await this.custRepo.find({where:{name: Like(search)}});
    }

    async showposter(){
        return await this.posterRepo.find();
    }
    async addposter(addPosterDTO){
        try{
            return {
                message: "success",
                rowdata: await this.posterRepo.insert(addPosterDTO)
            }
        }
        catch(e){
            return {
                message: "failed",
                error: e.detail
            }
        }
    }
    async deleteposter(deletePosterDTO){
        return await this.posterRepo.delete(deletePosterDTO.id);
    }
    async updateposter(updatePosterDTO){
        return await this.posterRepo.update(updatePosterDTO.id, updatePosterDTO);
    } 
    async searchposter(searchPosterDTO){
        return await this.posterRepo.findBy(searchPosterDTO.id);
    }
}
