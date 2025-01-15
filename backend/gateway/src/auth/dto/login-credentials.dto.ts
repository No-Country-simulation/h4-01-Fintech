import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginWithCredentialsDto {
    @ApiProperty({
    example: 'john_doe@test.com',
    description: 'Email',
    nullable: false
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
    example: 'John_88Doe',
    description: 'Password must have at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number',
    nullable: false,
    minLength: 8,
    maxLength: 30
    })
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(30)
    password: string;
}
