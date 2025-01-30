import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  BeforeInsert,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('balance')
export class BalanceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // ID del balance, UUID único

  @ManyToOne(() => UserEntity, (user) => user.balance, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: UserEntity; // Relación con el usuario

  @UpdateDateColumn() // autualizacion automatica
  last_updated: Date; // Fecha y hora de la última actualización del balance

  @Column({ type: 'varchar', length: 22, unique: true })
  cvu: string; // El CVU asociado al balance

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  amount: number;

  // Generar el CVU automáticamente antes de insertar el balance
  @BeforeInsert()
  generateCVU() {
    this.cvu = `CVU${Math.random().toString().slice(2, 12)}`; // Usamos el UUID para generar el CVU
  }
}
