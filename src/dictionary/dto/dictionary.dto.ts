import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class DictionaryDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    word: string
}