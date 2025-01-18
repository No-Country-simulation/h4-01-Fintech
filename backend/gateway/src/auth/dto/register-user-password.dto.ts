import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserWithEmailAndPasswordDto {
    @ApiProperty({
    example: 'john_doe@test.com',
    description: 'Email',
    nullable: false
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @ApiProperty({
    example: 'Marcus Edwards',
    description: 'Full Name',
    nullable: false
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
    example: '78457778',
    description: 'DNI',
    nullable: false
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(11)
    @Matches(/^(?!0{2,})[0-9]+$/, {
        message: 'DNI must be a valid number',
    })
    dni: string;

    @ApiProperty({
    example: 'John_88Doe',
    description: 'Password must have a Uppercase, lowercase letter, a number and one special character',
    nullable: false,
    minLength: 8,
    maxLength: 30
    })
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(30)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_])[^\s]+$/, {
    message: 'The password must have a Uppercase, lowercase letter, a number and one special character'
    })
    password: string;
}
