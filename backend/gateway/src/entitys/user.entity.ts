import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true }) // permitir nulo 
  passwordhash?: string;

  @OneToMany(() => AccountEntity, (account) => account.user, { cascade: true })
  accounts: AccountEntity[];
}
