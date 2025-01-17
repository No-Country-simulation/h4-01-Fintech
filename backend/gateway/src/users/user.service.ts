import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entitys/user.entity';
import { AccountEntity } from '../entitys/account.entity';
import * as bcrypt from 'bcrypt';

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

  // Crear usuario con correo y contraseña
  async createUserWithEmailAndPassword({
    email,
    name,
    dni,
    password,
  }: {
    email: string;
    name: string;
    dni: string;
    password: string;
  }): Promise<UserEntity> {

    try {
      const userExists = await this.userRepository.findOneBy({
        email: email,
      });
  
      if (userExists) throw new ConflictException(`User with email ${email} already exists`);
  
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(
        password,
        salt,
      );
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutos

      const user = this.userRepository.save({ email, name, dni, passwordhash: hashedPassword, token_expires_at: expiresAt });
      delete (await user).passwordhash
      return user;
    } catch (error) {
      throw new BadRequestException(error.message) 
    }
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

  // Activar un usuario
  async activateUser(
    email: string,
  ){
    const user = await this.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    user.is_active = true;
    user.token_expires_at =null;
    const result = this.userRepository.save(user)
    return result
  }
}
