import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CommentDto{
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @IsNumber()
    @IsNotEmpty()
    post_id: number;
}