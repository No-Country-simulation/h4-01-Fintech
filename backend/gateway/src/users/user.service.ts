import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { AccountEntity } from '../entities/account.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  // Buscar usuario por email
  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  // Crear usuario
  async createUser({
    email,
    name,
    image,
  }: {
    email: string;
    name: string | null;
    image: string | null;
  }): Promise<UserEntity> {
    const user = this.userRepository.create({ email, name, image });
    return this.userRepository.save(user);
  }

  // Buscar cuenta por proveedor y providerAccountId
  async findAccountByProvider(
    provider: string,
    providerAccountId: string,
  ): Promise<AccountEntity | undefined> {
    return this.accountRepository.findOne({
      where: { provider, providerAccountId },
    });
  }

  // Crear cuenta
  async createAccount({
    userId,
    type,
    provider,
    providerAccountId,
    refresh_token,
    expires_at,
    token_type,
  }: {
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token: string | null;
    expires_at: number | null;
    token_type: string | null;
  }): Promise<AccountEntity> {
    const account = this.accountRepository.create({
      userId,
      type,
      provider,
      providerAccountId,
      refresh_token,
      expires_at,
      token_type,
    });
    return this.accountRepository.save(account);
  }
}
