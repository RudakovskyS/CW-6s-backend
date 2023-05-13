import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PostDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    content: string;
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    topic_id: number;
}