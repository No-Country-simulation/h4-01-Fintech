import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entitys/user.entity';
import { AccountEntity } from 'src/entitys/account.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
  ) {}

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createSocialUser({
    email,
    provider,
    providerAccountId,
  }: {
    email: string;
    provider: string;
    providerAccountId: string;
  }) {
    const user = this.userRepository.create({ email });
    await this.userRepository.save(user);

    const account = this.accountRepository.create({
      user,
      provider,
      providerAccountId,
    });
    await this.accountRepository.save(account);

    return user;
  }

  async findAccountByProvider(
    email: string,
    provider: string,
  ): Promise<AccountEntity | undefined> {
    return this.accountRepository.findOne({
      where: { email, provider },
    });
  }
}
