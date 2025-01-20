import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class QuestionDto {
    @ApiProperty({
        example: 'How likely are you to invest?',
        description: 'Question',
        nullable: false
    })
    @IsNotEmpty()
    question: string;

    @ApiProperty({
        example: 1,
        description: 'Order of question',
        nullable: false
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    order: number;
}