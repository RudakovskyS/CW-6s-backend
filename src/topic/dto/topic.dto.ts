import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty, ApiTags } from '@nestjs/swagger';
export class TopicDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;
}