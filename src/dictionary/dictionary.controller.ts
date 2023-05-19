import { Body, Controller, Post } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { DictionaryDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/dictionary')
@ApiTags('api/dictionary')
export class DictionaryController {
    constructor (private dictionaryService: DictionaryService){}

    @Post()
    findDefinition(@Body() dto: DictionaryDto){
        try {
            return this.dictionaryService.findDefinition(dto)
        } catch (err) {
            console.log(err)
        }
        
    }
}
