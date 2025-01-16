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
    dni: string;

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
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;
}
