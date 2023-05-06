import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PostDto{
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;
    
    @IsNumber()
    @IsNotEmpty()
    topic_id: number;
}