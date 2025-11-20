import { Injectable } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class BotService {
    private bot: TelegramBot;
    private sessions = new Map();

    constructor() {
        this.bot = new TelegramBot(process.env.BOT_TOKEN as string, { polling: true });

        this.bot.on('message', (msg) => {
            const chatId = msg.chat.id;
            const text = msg.text;

            let session = this.sessions.get(chatId);

            if (text === '/start') {
                session = this.startNewTest(chatId);
                return;
            }

            const current = session.questions[session.index];

            const userAnswer = Number(text);

            if (!isNaN(userAnswer) && userAnswer === current.answer) {
                session.correct++;
                this.bot.sendMessage(chatId, "tog'ri!");
            } else {
                this.bot.sendMessage(chatId, `notog'ri javob: ${current.answer}`);
            }

            session.index++;

            // Agar test tugagan bo'lsa
            if (session.index >= 10) {
                this.bot.sendMessage(
                    chatId,
                    `Test tugadi!\nTo‘g‘ri javoblar soni: ${session.correct} / 10`
                );

                this.bot.sendMessage(chatId, "Yana ishlamoqchimisiz? /start bosing");
                this.sessions.delete(chatId);
                return;
            }

            const nextQ = session.questions[session.index];
            this.bot.sendMessage(chatId, `Savol ${session.index + 1}: ${nextQ.text}`);
        });
    }

    private generateQuestions() {
        const questions: any = [];
        for (let i = 0; i < 10; i++) {
            const a = Math.floor(Math.random() * 10);
            const b = Math.floor(Math.random() * 10);
            const text = `${a} + ${b} = ?`;
            const answer = a + b;
            questions.push({ text, answer });
        }
        return questions;
    }

    private startNewTest(chatId: number) {
        const session = {
            questions: this.generateQuestions(),
            index: 0,
            correct: 0
        };

        this.sessions.set(chatId, session);

        const first = session.questions[0];
        this.bot.sendMessage(chatId, `savol boshlanadi!\n\n1-savol: ${first.text}`);

        return session;
    }
}
