import { Controller,Get,Param } from '@nestjs/common';
import { AutoTagerService } from './auto-tager.service'

@Controller('auto-tager')
export class AutoTagerController {

    constructor(private autoTagerService: AutoTagerService) { }

    @Get()
    async FindTopWords() {
        console.log('MenaController')
        return this.autoTagerService.GetTopWords('topStores')
    }

    @Get(':id')
    async FindTopWordByType(@Param('id') id: string) {
        return this.autoTagerService.GetTopWords(id)
        return ''
    }

}
