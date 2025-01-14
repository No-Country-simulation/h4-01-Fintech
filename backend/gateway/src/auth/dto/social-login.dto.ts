// src/auth/dto/social-login.dto.ts
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class SocialLoginDto {
  @IsString()
  type: string;

  @IsString()
  provider: string;

  @IsString()
  providerAccountId: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  refresh_token?: string;

  @IsOptional()
  @IsString()
  image?: string;
}