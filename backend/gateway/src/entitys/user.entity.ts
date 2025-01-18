import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', nullable: true })
  name!: string | null;

  @Column({ type: 'varchar', nullable: true, unique: true })
  email!: string | null;

  @Column({ type: 'varchar', nullable: true, unique: true })
  dni!: string | null;

  @Column({ nullable: true }) // permitir nulo
  passwordhash?: string;

  @Column({ type: 'varchar', nullable: true })
  image!: string | null;

  @Column({type: 'varchar', nullable: true})
  token_expires_at: Date;

  @Column({ type: 'boolean', default: false})
  is_active: boolean;

  @Column({ type: 'boolean', default: false})
  is_validated_email: boolean;

  @OneToMany(() => AccountEntity, (account) => account.userId)
  accounts!: AccountEntity[];
}
