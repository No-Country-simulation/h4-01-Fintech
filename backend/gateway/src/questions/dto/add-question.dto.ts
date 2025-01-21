import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";
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

    @ApiProperty({
    example: 1,
    description: 'Minimum range value',
    default: 1
     })
    @IsNumber()
    @Min(1)
    minRange: number = 1;

    @ApiProperty({
    example: 10,
    description: 'Maximum range value',
    default: 10
    })
    @IsNumber()
    @Max(10)
    maxRange: number = 10;

    @ApiProperty({
    example: 'Not at all likely',
    description: 'Label for minimum range value',
    nullable: false
    })
    @IsNotEmpty()
    @IsString()
    minRangeLabel: string;

    @ApiProperty({
    example: 'Extremely likely',
    description: 'Label for maximum range value',
    nullable: false
    })
    @IsNotEmpty()
    @IsString()
    maxRangeLabel: string;
}
