import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginWithCredentialsDto } from 'src/auth/dto/login-credentials.dto';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}
    async createUser(dto: LoginWithCredentialsDto) {
        const user = this.userRepository.create(dto);
        return this.userRepository.save(user);
    }

    async findUserByEmail(email: string): Promise<UserEntity | undefined> {
        return await this.userRepository.findOne({ where: { email }});
    }
}
