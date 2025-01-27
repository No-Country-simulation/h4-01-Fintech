import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { AccountEntity } from '../entities/account.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    private readonly dataSource: DataSource,
  ) {}

  // Buscar usuario por email
  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ where: { id }});
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

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const [userByEmail, userByDni] = await Promise.all([
        this.userRepository.findOneBy({ email }),
        this.userRepository.findOneBy({ dni }),
      ]);

      if (userByEmail) {
        throw new ConflictException(`El email ${email} ya está registrado`);
      }

      if (userByDni) {
        throw new ConflictException(`El DNI ${dni} ya está registrado`);
      }

      const cleanEmail = email.toLowerCase().trim();
      const cleanName = name.trim();
      const cleanDni = dni.trim();

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

      const newUser = await queryRunner.manager.save(UserEntity, {
        email: cleanEmail,
        name: cleanName,
        dni: cleanDni,
        passwordhash: hashedPassword,
        token_expires_at: expiresAt,
        created_at: new Date(),
        updated_at: new Date(),
      });

      await queryRunner.manager.save(AccountEntity, {
        userId: newUser.id,
        type: 'credentials',
        provider: 'credentials',
        providerAccountId: newUser.id,
      });

      await queryRunner.commitTransaction();

      const userResponse = { ...newUser };
      delete userResponse.passwordhash;

      return userResponse;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      if (error instanceof Error && error.message.includes('bcrypt')) {
        throw new InternalServerErrorException(
          'Error al encriptar la contraseña. Intente nuevamente.',
        );
      }

      console.error('Error creating user:', error);
      throw new InternalServerErrorException(
        'Error al crear el usuario. Por favor, inténtelo de nuevo.',
      );
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
    //refresh_token,
    //expires_at,
    //token_type,
  }: {
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    //refresh_token: string | null;
    //expires_at: number | null;
    //token_type: string | null;
  }): Promise<AccountEntity> {
    const account = this.accountRepository.create({
      userId,
      type,
      provider,
      providerAccountId,
      //refresh_token,
      //expires_at,
      //token_type,
    });
    return this.accountRepository.save(account);
  }

  // Activar un usuario
  async activateUser(
    email: string,
  ): Promise<UserEntity | string>{
    const user = await this.findByEmail(email);
    if (!user) {
        throw new NotFoundException('Usuario no encontrado');
    }
    user.is_active = true;
    user.is_validated_email = true;
    user.token_expires_at = null;
    const result = await this.userRepository.save(user);
    
    return result;
  }

  async updateUser(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(user);
}
  async riskProfile(user: UserEntity, average: number): Promise<boolean> {
    user.risk_percentage = average;
    await this.userRepository.save(user);
    return true;
  }
}
