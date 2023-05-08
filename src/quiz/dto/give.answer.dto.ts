import { IsNotEmpty, IsString } from "class-validator";

export class GiveAnswerDto{

    @IsString()
    @IsNotEmpty()
    answer: string;
}