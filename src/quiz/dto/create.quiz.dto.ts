import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator"

export class CreateQuizDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    question: string;

    @IsArray()
    @IsNotEmpty()
    @ApiProperty()
    answers: string[];
}