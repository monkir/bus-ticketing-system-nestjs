import { Body, Controller, Post, Session, UsePipes, ValidationPipe } from "@nestjs/common";
import { loginForm } from "./customer.dto";
import { CustomerService } from "./customer.service";

@Controller('customer')
export class customerController{
    constructor(private customerService: CustomerService){}
    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body() loginDTO: loginForm, @Session() session ):Promise<any>
    {
        if (await this.customerService.login(loginDTO)){
            // session.email=loginDTO.email;
            session.email = loginDTO.email;
            session.user='customer'
            return {'Message': 'Successfully Logged in'};
        }
        else
        {
            return {'Message': 'Invalid Creditential'}
        }
    }
}