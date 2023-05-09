import { IsNotEmpty } from "class-validator";

export class loginForm 
{   
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}