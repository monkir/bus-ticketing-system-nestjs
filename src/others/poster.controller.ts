import { Controller, Get } from "@nestjs/common";
import { PosterService } from "./poster.service";

@Controller('posters')
export class posterController
{
    constructor (private posterService: PosterService){}
    
    @Get('showposters')
    async showposter(){
        return await this.posterService.showposter();
    }
}