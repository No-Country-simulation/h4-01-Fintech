// Esta tabla almacena los objetivos financieros de los usuarios.

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('goals')
export class GoalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.goals)
  user: UserEntity;

  @Column()
  name: string; // Nombre del objetivo (Ej: Vacaciones 2025)

  @Column('decimal', { precision: 10, scale: 2 })
  targetAmount: number; // Monto objetivo

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  progress: number; // Progreso hacia el objetivo
}
