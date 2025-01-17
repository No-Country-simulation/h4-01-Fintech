import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  Check,
} from 'typeorm';
import { UserEntity } from './user.entity';
// la respuesta a las preguntas se guardaran en la siguiente tabla.
@Entity('questions')
@Check(`"p_q1" BETWEEN 1 AND 10`)
@Check(`"p_q2" BETWEEN 1 AND 10`)
@Check(`"p_q3" BETWEEN 1 AND 10`)
@Check(`"p_q4" BETWEEN 1 AND 10`)
@Check(`"p_q5" BETWEEN 1 AND 10`)
@Check(`"p_q6" BETWEEN 1 AND 10`)
@Check(`"p_q7" BETWEEN 1 AND 10`)
export class QuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', unique: true })
  userId!: string;

  @Column({ type: 'int' })
  p_q1!: number;

  @Column({ type: 'int' })
  p_q2!: number;

  @Column({ type: 'int' })
  p_q3!: number;

  @Column({ type: 'int' })
  p_q4!: number;

  @Column({ type: 'int' })
  p_q5!: number;

  @Column({ type: 'int' })
  p_q6!: number;

  @Column({ type: 'int' })
  p_q7!: number;

  @OneToOne(() => UserEntity, (user) => user.question, {
  })
  @JoinColumn({ name: 'userId' })
  user!: UserEntity;
}


// actualizar con la rama que tiene heba creada NOTA