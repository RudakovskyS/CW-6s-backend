import { IsArray, IsNotEmpty, IsString } from "class-validator"

export class CreateQuizDto{
    @IsString()
    @IsNotEmpty()
    question: string;

    @IsArray()
    @IsNotEmpty()
    answers: string[];
}