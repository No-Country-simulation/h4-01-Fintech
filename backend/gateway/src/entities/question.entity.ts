import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AnswerEntity } from "./answer.entity";

@Entity('questions')
export class QuestionEntity {
    @PrimaryGeneratedColumn('uuid')
      id: string;

    @Column({ type: 'varchar', nullable: false })
      question: string;

    @Column({ type: 'varchar', unique: true, nullable: true})
    order: number;

    @Column({ type: 'int', default: 1 })
    minRange: number;

    @Column({ type: 'int', default: 10 })
    maxRange: number;

    @Column({ type: 'varchar', nullable: false })
    minRangeLabel: string;

    @Column({ type: 'varchar', nullable: false })
    maxRangeLabel: string;

    @OneToMany(() => AnswerEntity, (answer) => answer.question)
    answers: AnswerEntity[];
}
