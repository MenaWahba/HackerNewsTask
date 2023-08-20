import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";

import { AutoTagerController } from './auto-tager.controller';
import { AutoTagerService } from './auto-tager.service';
import { HackerNewsProvider } from './Providers/HackerNewsProvider'
import { WordAnalysisProvider } from './Providers/WordAnalysisProvider'

@Module({
    imports: [HttpModule],
    controllers: [AutoTagerController],
    providers: [AutoTagerService, HackerNewsProvider, WordAnalysisProvider]
})
export class AutoTagerModule { }
