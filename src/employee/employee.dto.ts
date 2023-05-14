import { IsNotEmpty, IsInt, Length, IsEmail, IsNumberString, isNotEmpty, isNumberString } from "class-validator";

export class signupForm 
{

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    email: string;
    
    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    address: string;
      
    @IsNotEmpty()
    @Length(8)
    password: string;
    
    filename: string;
}
export class loginForm 
{   
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}
export class findcustomerForm 
{   
   @IsNotEmpty()
   @IsNumberString()
    id: string;
}
export class findbusownerForm 
{   
   @IsNotEmpty()
   @IsNumberString()
    id: string;
}
export class findBusProviderForm 
{   
   @IsNotEmpty()
    id: string;
}
export class addCustomerForm
{
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsNumberString()
    phone: string;

    @IsNotEmpty()
    address: string;

    password: string;
    profile:string;
    employee:number;
    
}
export class updateCustomerForm
{
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsNumberString()
    phone: string;

    @IsNotEmpty()
    address: string;

    // @IsNotEmpty()
    // password: string;

    // @IsNotEmpty()
    // profile:string;

    employee:number;
}
export class deleteCustomerForm
{
    @IsNotEmpty()
    id: string;
}
export class addbusownerForm
{
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsNumberString()
    phone: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    account: number;

    @IsNotEmpty()
    brtalicense: string;
}
export class updatebusownerForm
{
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    brtalicense: string;
}
export class deletebusownerForm
{
    @IsNotEmpty()
    @IsNumberString()
    id: string;

}
export class deleteBusOwnerForm
{
    @IsNotEmpty()
    @IsNumberString()
    id: string;
}
export class addPosterForm{
    // @IsNotEmpty()
    // @IsNumberString()
    image: string;
}
export class searchPosterForm{
    // @IsNotEmpty()
    // @IsNumberString()
    image: string;
}
export class updatePosterForm{
    @IsNotEmpty()
    @IsNumberString()
    id: string;

    // @IsNotEmpty()
    // @IsNumberString()
    image: string;

}
export class deletePosterForm{
    @IsNotEmpty()
    @IsNumberString()
    id: string;
}