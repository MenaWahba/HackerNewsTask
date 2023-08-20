import { Injectable } from "@nestjs/common";
import { wordCount } from "../Interfaces/wordCount.interface";

@Injectable()
export class WordAnalysisProvider {

    GetTopRepetedWords(sentences: string[], slice: number = 0) {

        const titleCount: wordCount[] = [];
        const wordsRank = sentences.reduce((prev: any, next: any) => {
            if (next !== undefined || next !== '' ) {
                const splitTitle = next?.split(' ');
                splitTitle?.forEach((word: any) => {
                    const foundWord = titleCount.find((item) => item.word === word);
                    foundWord
                        ? foundWord.count++
                        : titleCount.push({ word, count: 1 });
                });
                return titleCount;
            }
        }, [])?.sort((a: any, b: any) => b.count - a.count)

        if (slice != 0)
            return wordsRank?.slice(0, slice);
        else
            return wordsRank;
    }
}