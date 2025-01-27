import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AnswersService } from 'src/answers/answers.service';
import { QuestionsService } from 'src/questions/questions.service';
import { UserService } from 'src/users/user.service';

@Injectable()
export class RiskService {
    constructor(
        private userService: UserService,
        private answerService: AnswersService,
        private questionService: QuestionsService
    ) {}

    async calculateRisk(userId: string) {
        const user = await this.userService.findById(userId);
        if (!user) throw new BadRequestException('el usuario no existe ');
        if (user.risk_percentage) throw new BadRequestException('El porcentaje de riesgo del usuario ya está calculado');
        const answers = await this.answerService.getAnswers(userId);
        if (!answers) throw new NotFoundException('El usuario aún no ha respondido a ninguna pregunta');
        const questions = await this.questionService.getQuestions();
        if (questions.data.total !== answers.data.total)
            throw new BadRequestException('El usuario aún no ha respondido a todas las preguntas');
        let totalAnswers = 0;
        answers.data.answers.forEach(answer => {
            totalAnswers += answer.answer;
        });
        const average = totalAnswers / answers.data.total;
        await this.userService.riskProfile(user, average);
        const risk_type = this.riskType(average);
        const risk_message = this.riskMessage(average);
        return {
            status: true,
            message: 'El porcentaje de riesgo del usuario se ha calculado exitosamente',
            data: {
                risk_percentage: user.risk_percentage,
                risk_type,
                risk_message

            }
        }
    }

    private riskType (average: number): string {
        if (average <= 10 && average >= 7) return 'Conservador';
        if (average <= 6 && average >= 4) return 'Balanceado';
        return 'Agresivo';
    }

    private riskMessage(average: number): string {
         if (average <= 10 && average >= 7) return 'Prefiere inversiones seguras y resultados estables';
        if (average <= 6 && average >= 4) return 'Busca un balance entre seguridad y crecimiento';
        return 'Está dispuesto a asumir más riesgos para maximizar ganancias';
    }
}
