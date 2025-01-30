import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('balance')
export class BalanceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // ID del balance, UUID único

  @OneToOne(() => UserEntity, (user) => user.balance)
  @JoinColumn()
  user: UserEntity; // Relación con el usuario

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  balance: number; // Monto disponible en la cuenta del usuario

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_updated: Date; // Fecha y hora de la última actualización del balance

  @Column({ type: 'varchar', length: 22, unique: true })
  cvu: string; // El CVU asociado al balance

  // Generar el CVU automáticamente antes de insertar el balance
  @BeforeInsert()
  generateCVU() {
    // Generar un CVU único al crear el balance (ejemplo de formato: "0000000000000000000000")
    this.cvu = Array.from({ length: 22 }, () =>
      Math.floor(Math.random() * 10),
    ).join('');
  }
}
