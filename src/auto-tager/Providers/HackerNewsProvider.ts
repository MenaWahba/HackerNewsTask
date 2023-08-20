import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { catchError, firstValueFrom, lastValueFrom, switchMap, forkJoin } from 'rxjs';


@Injectable()
export class HackerNewsProvider {

    private baseUrl = 'https://hacker-news.firebaseio.com/v0/';


    constructor(private httpService: HttpService) { }

    GetLastStoresTitles(slice: number = 0): Promise<string[]> {

        const storyFunction = (data: any) => {
            return this.getStoryTitle(data)
        };
        return this.GetStories('newstories.json', storyFunction,slice);
    }

    GetLastWeekStoresTitles(slice: number = 0): Promise<string[]> {

        const storyFunction = (data: any) => {
            return this.getLasetWeekStory(data)
        };
        return this.GetStories('beststories.json', storyFunction,slice);
    }

    Get10KKarmaStoresTitles(slice: number = 0): Promise<string[]> {
        const storyFunction = (data: any) => {
            return this.getStoryWithUser(data)
        };
        return this.GetStories('newstories.json', storyFunction,slice);
    }


    private GetStories(path: string, storyFunction: any, slice: number = 0) {
        const data = this.httpService.get(`${this.baseUrl}${path}`)
            .pipe(
                switchMap((axiosResponse) => {
                    if (slice != 0)
                        return forkJoin(axiosResponse.data.slice(0, 25).map(storyFunction))
                    else
                        return forkJoin(axiosResponse.data.map(storyFunction));
                }),
                catchError((error) => {
                    throw 'An error happened!';
                }),
            );
        return lastValueFrom(data) as Promise<string[]>;
    }

    private getStory(storyId: string | number) {
        return firstValueFrom(
            this.httpService.get(`${this.baseUrl}item/${storyId}.json`).pipe(
                catchError((error) => {
                    throw 'An error happened!';
                }),
            ),
        ) ;
    }

    async getStoryTitle(storyId: string | number) {

        return (await this.getStory(storyId)).data.title;
    }

    async getLasetWeekStory(storyId: string | number) {
        const { data } =  await this.getStory(storyId)

        var storyTime = new Date(data.time * 1000)
        const diffTime = Math.abs(new Date().valueOf() - storyTime.valueOf());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 7)
            return data.title;
    }
    async getStoryWithUser(storyId: string | number) {

        const { data } =  await this.getStory(storyId)
        const userKarma = await this.getStoryUserkarma(data.by)
        if (userKarma != undefined && userKarma >= 10000)
            return data.title;
    }

    async getStoryUserkarma(UserName: string): Promise<number> {

        const { data } = await firstValueFrom(
            this.httpService.get(`${this.baseUrl}user/${UserName}.json`).pipe(
                catchError((error) => {                   
                    throw 'An error happened!';
                }),
            ),
        );
        return data.karma;
    }
}