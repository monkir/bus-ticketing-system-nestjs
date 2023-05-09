import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { busownerEntity } from "./busowner.entity";

@Module(
    {
        imports: [TypeOrmModule.forFeature([busownerEntity])], 
    }
)
export class busownerModule{}