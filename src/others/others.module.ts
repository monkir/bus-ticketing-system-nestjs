
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { posterEntity } from './poster.entity';

@Module(
    {
        imports: [TypeOrmModule.forFeature([posterEntity])], 
        // controllers: [],
        // providers: []
    }
)
export class othersModule { }
