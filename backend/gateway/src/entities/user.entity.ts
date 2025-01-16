import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { AccountEntity } from './account.entity';
import { QuestionEntity } from './question.entity';
import { TransactionEntity } from './transactions.entity';
import { NotificationEntity } from './notifications.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', nullable: true })
  name!: string | null;

  @Column({ type: 'varchar', nullable: true, unique: true })
  email!: string | null;

  @Column({ nullable: true }) // permitir nulo
  passwordhash?: string;

  @Column({ type: 'varchar', nullable: true })
  image!: string | null;

  @OneToMany(() => AccountEntity, (account) => account.userId)
  accounts!: AccountEntity[];

  @OneToOne(() => QuestionEntity, (question) => question.user, {
    cascade: true,
  })
  @JoinColumn({ name: 'questionId' })
  question?: QuestionEntity;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.user)
  transaction?: TransactionEntity[];

  @OneToMany(() => NotificationEntity, (notification) => notification.user, {
    cascade: true,
  })
  notifications!: NotificationEntity[];
}
