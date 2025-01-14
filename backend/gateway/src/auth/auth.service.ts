import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginWithCredentialsDto } from './dto/login-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { IJwtPayload } from './interfaces';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(dto: LoginWithCredentialsDto)
    {
        const { email, password } = dto;
        const user = await this.userService.findUserByEmail(email);
        if (!user) throw new UnauthorizedException('Invalid credentials');
        const verifyPass = await this.verifyPassword(password, user.password);
        if (!verifyPass) throw new UnauthorizedException('Invalid credentials');
        const token = this.generateJwtToken({ id: user.id });
        return {
            message: 'User logged in successfully',
            token,
            data: {
                id: user.id,
                email
            }
        };
    }

    async verifyPassword(comingPass: string, savedPass: string) {
        return  await bcrypt.compare(comingPass, savedPass);
    }

    generateJwtToken(payload: IJwtPayload) {
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_REFRESH_EXPIRATION || '24h'
        });
        return token;
    }
}
