import { IsNotEmpty, IsString } from "class-validator";

export class DictionaryDto{
    @IsString()
    @IsNotEmpty()
    word: string
}