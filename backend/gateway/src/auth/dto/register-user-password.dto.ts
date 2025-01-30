import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsString, Matches, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserWithEmailAndPasswordDto {
  @ApiProperty({
    example: 'john_doe@test.com',
    description: 'Correo electrónico',
    nullable: false,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Marcus Edwards',
    description: 'Nombre completo',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '78457778',
    description: 'DNI',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(11)
  @Matches(/^(?!0{2,})[0-9]+$/, {
    message: 'El DNI debe ser un número válido',
  })
  dni: string;

  @ApiProperty({
    example: 'John_88Doe',
    description:
      'La contraseña debe incluir una letra mayúscula, una minúscula, un número y un carácter especial',
    nullable: false,
    minLength: 8,
    maxLength: 30,
  })
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(30)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_])[^\s]+$/,
    {
      message:
        'La contraseña debe incluir una letra mayúscula, una minúscula, un número y un carácter especial',
    },
  )
  password: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}