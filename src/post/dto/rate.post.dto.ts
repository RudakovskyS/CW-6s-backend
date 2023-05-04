import { IsNotEmpty, IsNumber } from "class-validator";

export class RatePostDto{
    @IsNumber()
    @IsNotEmpty()
    user_id: number;
}