import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { posterEntity } from "./poster.entity";
import { Repository } from "typeorm";

@Injectable()
export class PosterService {
    constructor(
        @InjectRepository(posterEntity)
        private posterRepo: Repository<posterEntity>
    ){}
    async showposter(){
        return await this.posterRepo.find();
    }
}