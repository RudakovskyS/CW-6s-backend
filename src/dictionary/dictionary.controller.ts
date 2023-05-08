import { Body, Controller, Get } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { DictionaryDto } from './dto';

@Controller('api/dictionary')
export class DictionaryController {
    constructor (private dictionaryService: DictionaryService){}

    @Get()
    findDefinition(@Body() dto: DictionaryDto){
        return this.dictionaryService.findDefinition(dto)
    }
}
