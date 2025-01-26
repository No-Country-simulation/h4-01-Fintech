import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Min, Max } from "class-validator";

export class UpdateAnswerDto {
    @ApiProperty({
        example: 3,
        description: 'Answer to the question from 1 to 10',
        nullable: false
    })
    @IsNotEmpty()
    @Min(1)
    @Max(10)
    answer: number;
}
