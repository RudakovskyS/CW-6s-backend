import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class GiveAnswerDto{
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @IsString()
    @IsNotEmpty()
    answer: string;
}