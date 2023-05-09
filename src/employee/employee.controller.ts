/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes,Session, ValidationPipe, UnauthorizedException, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { addbusownerForm, addCustomerForm, deleteCustomerForm, findbusownerForm, findcustomerForm, loginForm, signupForm, updatebusownerForm, updateCustomerForm } from './employee.dto';
import { sessionGuard } from './employee.guard';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
    constructor(private employeeService: EmployeeService){

    }
    //index
    @Get()
    find():any{
        return this.employeeService.getIndex()
        return "Welcome to employee panel"
    }
    @Post('signup')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('profile',{
        storage:diskStorage({
            destination: './uploads',
            filename: function (req, file, cb) {
                cb(null,Date.now()+file.originalname)
            }
        })
    }))
    signup(
        @Body() signupDTO: signupForm, 
        @UploadedFile(  new ParseFilePipe({
            validators: [
            new MaxFileSizeValidator({ maxSize: 160000 }),
            new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
            ],
        }),) file: Express.Multer.File)
    {
        signupDTO.filename=file.filename;
        return this.employeeService.signup(signupDTO)
    }
    //employee login
    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body() loginDTO: loginForm, @Session() session ):Promise<any>
    {
        if (await this.employeeService.login(loginDTO)){
            // session.email=loginDTO.email;
            session.email = loginDTO.email;
            session.userid=(await this.employeeService.EmpgetIDbyEmail(loginDTO.email)).toString()
            session.user='admin'
            return {message: 'success'};
        }
        else
        {
            return {message: 'failed'}
        }
    }
    //Managing Customers
    //find customer
    @Get("showcustomers")
    @UseGuards(sessionGuard)
    showcustomes():any
    {
        return this.employeeService.showcustomers();
    }
    //find customer
    @Get("findcustomer/:id")
    @UsePipes(new ValidationPipe())
    findcustomer(@Param() findCustomerDto: findcustomerForm):any
    {
        return this.employeeService.findcustomer(findCustomerDto);
    }

    
/////////////////////////////////
    //find busowner
    @Get("showbusowners")
    @UseGuards(sessionGuard)
    showbusowners():any
    {
        return this.employeeService.showbusowners();
    }
    //find customer
    @Get("findbusowner/:id")
    @UsePipes(new ValidationPipe())
    findbusowner(@Param() findBusownerDto: findbusownerForm):any
    {
        return this.employeeService.findbusowner(findBusownerDto);
    }

    /////////////////////////////////
    //add customer
    @Post('addcustomer')
    @UseGuards(sessionGuard)
    @UseInterceptors(FileInterceptor('profile',{
        storage:diskStorage({
            destination: './uploads',
            filename: function (req, file, cb) {
                cb(null,Date.now()+file.originalname)
            }
        })
    }))
    @UsePipes(new ValidationPipe())
    @UseGuards(sessionGuard)
    addcustomer(@Body() addCustomerDTO: addCustomerForm, @Session() session,
    @UploadedFile(  new ParseFilePipe({
        validators: [
        new MaxFileSizeValidator({ maxSize: 160000 }),
        new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
        ],
    }),) file: Express.Multer.File):any
    {
        addCustomerDTO.profile=file.filename;
        addCustomerDTO.employee=session.userid
        return this.employeeService.addcustomer(addCustomerDTO);
    }
    //Update Customer
    @Put('updatecustomer')
    @UsePipes(new ValidationPipe())
    @UseGuards(sessionGuard)
    async updatecustomer(@Body() updateCustomerDTO:updateCustomerForm, @Session() session):Promise<any>
    {
        updateCustomerDTO.employee=session.userid;
        //updateCustomerDTO.id=await this.employeeService.CustgetIDbyEmail(updateCustomerDTO.email);
        console.log(session.userid)
        console.log(updateCustomerDTO.id)
        return this.employeeService.updatecustomer(updateCustomerDTO)
    }
    //delete customer
    @Delete('deletecustomer/:id')
    @UsePipes(new ValidationPipe())
    deletecustomer(@Param() deleteCustomerDTO: deleteCustomerForm):any
    {
        return this.employeeService.deletecustomer(deleteCustomerDTO)
    }
    //Managing bus provider
    //Finding bus provider
    // @Get("findbusprovider/:id")
    // @UsePipes(new ValidationPipe())
    // findbusprovider(@Param() findBusProviderDTO: findcustomerForm):any
    // {
    //     return this.employeeService.findbusprovider(findBusProviderDTO)
    // }
    //Adding bus provider
    @Post('addbusowner')
    @UsePipes(new ValidationPipe())
    addbusowner(@Body() addbusownerDTO: addbusownerForm):any
    {
        return this.employeeService.addbusowner(addbusownerDTO)
    }
    //updating bus provider
    @Put('updatebusowner')
    @UsePipes(new ValidationPipe())
    updatebusowner(@Body() updatebusownerDTO: updatebusownerForm)
    {
        return this.employeeService.updatebusowner(updatebusownerDTO)
    }
    //deleting bus provider
    @Delete('deletebusowner/:id')
    deletebusowner(@Param() deleteCustomerDTO: deleteCustomerForm)
    {
        return this.employeeService.deletebusowner(deleteCustomerDTO)
    }
    @Get('logout')
    logout(@Session() session){
        if(session.destroy()){
            return {'Message':'Successfully Loged out'}
        }
        else{
            throw new UnauthorizedException("invalid actions"); 
        }
    }
    //Send mail
    @Post('sendmail')
    sendmail()
    {
        return this.employeeService.sendmail()
    }

    @Get('/getimage/:name')
    getImages(@Param('name') name, @Res() res) {
        // try{
        //     res.sendFile(name,{ root: './uploads' });
        // }
        // catch{
        //     res.sendFile("image-not-found.png",{ root: './uploads' });
        // }
        const fs = require('fs')
        const path = './uploads/'+name;
        try {
            if (fs.existsSync(path)) {
                res.sendFile(name,{ root: './uploads' });
            }
            else{
                res.sendFile("image-not-found.png",{ root: './uploads' });
            }
        } catch(err) {
            res.sendFile("image-not-found.png",{ root: './uploads' });
        }
      
    }
}
