import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID, Min, Max } from "class-validator";

export class AddAnswerDto {
    @ApiProperty({
        example: '232f6d1e-facd-45f9-b398-40b06d4f16f9',
        description: 'User Id',
        nullable: false
    })
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty({
        example: '8dd6101c-e301-47f3-8274-2c468171e8ab',
        description: 'Question Id',
        nullable: false
    })
    @IsNotEmpty()
    @IsUUID()
    questionId: string;

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
