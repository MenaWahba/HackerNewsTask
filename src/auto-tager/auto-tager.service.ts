import { Injectable } from '@nestjs/common';

import { HackerNewsProvider } from './Providers/HackerNewsProvider'
import { WordAnalysisProvider } from './Providers/WordAnalysisProvider'

@Injectable()
export class AutoTagerService {

    constructor(
        private readonly hackerNews: HackerNewsProvider,
        private readonly wordAnalysis: WordAnalysisProvider) { }

    async GetTopWords(param: string): Promise<string[]> {
        let titles = []
        switch (param) {
            case 'lastweek':
                titles = await this.hackerNews.GetLastWeekStoresTitles();
                break;
            case '10kkarma':
                titles = await this.hackerNews.Get10KKarmaStoresTitles();
                break;
            default:
                titles = await this.hackerNews.GetLastStoresTitles(25);
                break;
        }
        return this.wordAnalysis.GetTopRepetedWords(titles, 10);
    }
}
