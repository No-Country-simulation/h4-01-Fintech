import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Check, OneToOne } from 'typeorm';
import { AccountEntity } from './account.entity';
import { AnswerEntity } from './answer.entity';
import { TransactionEntity } from './transactions.entity';
import { NotificationEntity } from './notifications.entity';
import { BalanceEntity } from './balance.entity';

@Entity('users')
@Check(`risk_percentage BETWEEN 1 AND 10`)
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

  @Column({ type: 'varchar', nullable: true })
  token_expires_at: Date;

  @Column({ type: 'boolean', default: false })
  is_active: boolean;

  @Column({ type: 'float', nullable: true })
  risk_percentage?: number;

  @OneToMany(() => AccountEntity, (account) => account.userId)
  accounts!: AccountEntity[];

  @OneToMany(() => AnswerEntity, (answer) => answer.user)
  answers: AnswerEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.user)
  transaction?: TransactionEntity[];

  @OneToMany(() => NotificationEntity, (notification) => notification.user, {
    cascade: true,
  })
  notifications!: NotificationEntity[];

  @OneToOne(() => BalanceEntity, (balance) => balance.user)
  balance: BalanceEntity;
}
