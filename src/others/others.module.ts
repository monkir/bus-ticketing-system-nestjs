
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { posterEntity } from './poster.entity';
import { posterController } from './poster.controller';
import { PosterService } from './poster.service';

@Module(
    {
        imports: [TypeOrmModule.forFeature([posterEntity])], 
        controllers: [posterController],
        providers: [PosterService]
    }
)
export class othersModule { }
