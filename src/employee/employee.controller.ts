/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, Session, ValidationPipe, UnauthorizedException, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { addbusownerForm, addCustomerForm, addPosterForm, deleteCustomerForm, deletePosterForm, findbusownerForm, findcustomerForm, loginForm, searchPosterForm, signupForm, updatebusownerForm, updateCustomerForm, updatePosterForm } from './employee.dto';
import { sessionGuard } from './employee.guard';
import { EmployeeService } from './employee.service';
import { AuthGuard } from './employee.auth';

@Controller('employee')
export class EmployeeController {
    constructor(private employeeService: EmployeeService) {

    }
    //index
    @Get()
    find(): any {
        return this.employeeService.getIndex()
        return "Welcome to employee panel"
    }
    @Post('signup')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('profile', {
        storage: diskStorage({
            destination: './uploads',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname)
            }
        })
    }))
    signup(
        @Body() signupDTO: signupForm,
        @UploadedFile(new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 160000 }),
                new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
            ],
        }),) file: Express.Multer.File) {
        signupDTO.filename = file.filename;
        return this.employeeService.signup(signupDTO)
    }
    //employee login
    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body() loginDTO: loginForm, @Session() session): Promise<any> {
        // if (await this.employeeService.login(loginDTO)){
        //     // session.email=loginDTO.email;
        //     session.email = loginDTO.email;
        //     session.userid=(await this.employeeService.EmpgetIDbyEmail(loginDTO.email)).toString()
        //     session.user='employee'
        //     const tableData=await this.employeeService.getDataByEmpEmail(loginDTO.email);
        //     return {message: 'success',name: tableData.name, image: tableData.filename};
        // }
        // else
        // {
        //     return {message: 'failed'}
        // }
        return this.employeeService.login(loginDTO);
    }
    //Managing Customers
    //find customer
    @Get("showcustomers")
    @UseGuards(AuthGuard)
    async showcustomes(): Promise<any> {
        return await this.employeeService.showcustomers();
    }
    //find customer
    @Get("findcustomer/:id")
    @UsePipes(new ValidationPipe())
    findcustomer(@Param() findCustomerDto: findcustomerForm): any {
        return this.employeeService.findcustomer(findCustomerDto);
    }
    @Get('searchcustomer/:search')
    async searchcustomer(@Param('search') search: string) {
        return await this.employeeService.searchCustomer(search);
    }


    /////////////////////////////////
    //find busowner
    @Get("showbusowners")
    @UseGuards(AuthGuard)
    showbusowners(): any {
        return this.employeeService.showbusowners();
    }
    //find customer
    @Get("findbusowner/:id")
    @UsePipes(new ValidationPipe())
    findbusowner(@Param() findBusownerDto: findbusownerForm): any {
        return this.employeeService.findbusowner(findBusownerDto);
    }

    /////////////////////////////////
    //add customer
    @Post('addcustomer')
    // @UseGuards(AuthGuard)
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('profile', {
        storage: diskStorage({
            destination: './uploads',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname)
            }
        })
    }))
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard)
    addcustomer(@Body() addCustomerDTO: addCustomerForm, @Session() session,
        @UploadedFile(new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 16000000 }),
                new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
            ],
        }),) file: Express.Multer.File): any {
        addCustomerDTO.profile = file.filename;
        addCustomerDTO.employee = session.userid
        return this.employeeService.addcustomer(addCustomerDTO);
    }
    //Update Customer
    @Put('updatecustomer')
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard)
    async updatecustomer(@Body() updateCustomerDTO: updateCustomerForm, @Session() session): Promise<any> {
        updateCustomerDTO.employee = session.userid;
        //updateCustomerDTO.id=await this.employeeService.CustgetIDbyEmail(updateCustomerDTO.email);
        console.log(session.userid)
        console.log(updateCustomerDTO.id)
        return this.employeeService.updatecustomer(updateCustomerDTO)
    }
    //delete customer
    @Delete('deletecustomer/:id')
    @UsePipes(new ValidationPipe())
    deletecustomer(@Param() deleteCustomerDTO: deleteCustomerForm): any {
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
    addbusowner(@Body() addbusownerDTO: addbusownerForm): any {
        return this.employeeService.addbusowner(addbusownerDTO)
    }
    //updating bus provider
    @Put('updatebusowner')
    @UsePipes(new ValidationPipe())
    updatebusowner(@Body() updatebusownerDTO: updatebusownerForm) {
        return this.employeeService.updatebusowner(updatebusownerDTO)
    }
    //deleting bus provider
    @Delete('deletebusowner/:id')
    deletebusowner(@Param() deleteCustomerDTO: deleteCustomerForm) {
        return this.employeeService.deletebusowner(deleteCustomerDTO)
    }
    @Get('logout')
    logout(@Session() session) {
        if (session.destroy()) {
            return { 'Message': 'Successfully Loged out' }
        }
        else {
            throw new UnauthorizedException("invalid actions");
        }
    }
    //Send mail
    @Post('sendmail')
    sendmail() {
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
        const path = './uploads/' + name;
        try {
            if (fs.existsSync(path)) {
                res.sendFile(name, { root: './uploads' });
            }
            else {
                res.sendFile("image-not-found.png", { root: './uploads' });
            }
        } catch (err) {
            res.sendFile("image-not-found.png", { root: './uploads' });
        }
    }
    // getting poster
    @Get('showposters')
    showposters() {
        return this.employeeService.showposter();
    }
    // adding a poster 
    @Post('addposter')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname)
            }
        })
    }))
    @UsePipes(new ValidationPipe())
    async addposter(
        @Body() addPosterDTO: addPosterForm,
        @UploadedFile(new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 16000000 }),
                new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
            ],
        }),) file: Express.Multer.File
    ) {
        addPosterDTO.image = file.filename;
        return this.employeeService.addposter(addPosterDTO);
    }
    //deleting a poster
    @Delete('deleteposter/:id')
    @UsePipes(new ValidationPipe())
    async deleteposter(@Param() deletePosterDTO: deletePosterForm) {
        return this.employeeService.deleteposter(deletePosterDTO)
    }
    //searching a poster
    @Get('searchposter/:id')
    @UsePipes(new ValidationPipe())
    async searchposter(@Param() searchPosterDTO: searchPosterForm) {
        return this.employeeService.searchposter(searchPosterDTO)
    }
    //updating a poster
    @Put('updateposter')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname)
            }
        })
    }))
    @UsePipes(new ValidationPipe())
    async updateposter(
        @Body() updatePosterDTO: updatePosterForm,
        @UploadedFile(new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 160000 }),
                new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
            ],
        }),) file: Express.Multer.File
    ) {
        updatePosterDTO.image = file.filename;
        return this.employeeService.updateposter(updatePosterDTO);
    }
}
