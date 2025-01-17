import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AnswerEntity } from "./answer.entity";

@Entity('questions')
export class QuestionEntity {
    @PrimaryGeneratedColumn('uuid')
      id: string;

    @Column({ type: 'varchar', nullable: false })
      question: string;

    @OneToMany(() => AnswerEntity, (answer) => answer.question)
    answers: AnswerEntity[];
}
