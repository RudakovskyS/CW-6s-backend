import { Injectable } from '@nestjs/common';
import { DictionaryDto } from './dto';

@Injectable()
export class DictionaryService {
    async findDefinition(dto: DictionaryDto) {
        const article = await this.getJsonFromDictionary(dto.word)
        const content = this.parseDefinitionsFromContent(article.Content)
        return {definitions: content}
    }

    parseDefinitionsFromContent(content) {
        const definitions = [];
        // write regex that check if the first letter is a "А-ЯІ" and the last letter is a "."
        const regex = /<p>([А-ЯІ].*?[.])<\/p>/g;
        const matches = content.matchAll(regex);
        for (const match of matches) {
            const definition = match[1];
            definitions.push(definition);
        }
        return definitions;
    }

    async getJsonFromDictionary(word: string) {
        let url = `https://verbum.by/api/search?q=${word}&in=tsblm`;
        let searchArticle = await this.getJsonFromUrl(url);
        if (!searchArticle) {
            return null;
        }
        const article = searchArticle.Articles[0];
        const id = article.ID;
        url = `https://verbum.by/api/dictionaries/tsblm/articles/${id}`;
        const json = await this.getJsonFromUrl(url);
        return json;
    }

    async getJsonFromUrl(url) {
        return await fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return {info: "Cannot find the word in the dictionary"}
            })
            .then((data) => {
                if (data.Articles && data.Articles.length === 0) {
                return {info: "Cannot find the word in the dictionary"}
                }
                return data;
            })
            .catch((error) => {
                console.error(error);
                return null;
            });
    }
}


