import { Injectable } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class BotService {
    private bot: TelegramBot;

    private drinks = [
        {
            id: 'cola',
            name: 'Coca-Cola 1L',
            price: 9000,
            desc: 'Shakarli gazlangan ichimlik',
            photo: 'https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure.webp'
        },
        {
            id: 'fanta',
            name: 'Fanta 1L',
            price: 8500,
            desc: 'Apelsin ta’mli ichimlik',
            photo: 'https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure.webp'
        },
    ];

    constructor() {
        this.bot = new TelegramBot(process.env.BOT_TOKEN as string, { polling: true });

        this.bot.onText(/\/start/, async (msg) => {
            const chatId = msg.chat.id;

            await this.bot.sendMessage(chatId, "Assalomu alaykum Mini FastFood xizmatiga xush kelibsiz!");

            await this.bot.sendMessage(chatId, "Iltimos telefon raqamingizni yuboring", {
                reply_markup: {
                    keyboard: [
                        [{ text: "📱 Raqamni yuborish", request_contact: true }]
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: true
                }
            });
        });

        this.bot.on('contact', async (msg) => {
            const chatId = msg.chat.id;

            await this.bot.sendMessage(chatId, "Rahmat! Endi manzilingizni yuboring", {
                reply_markup: {
                    keyboard: [
                        [{ text: "Joylashuvni yuborish", request_location: true }]
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: true
                }
            });
        });

        this.bot.on('location', async (msg) => {
            const chatId = msg.chat.id;
            const name = msg.chat.first_name;

            await this.bot.sendMessage(chatId, `Rahmat, ${name}! Endi kategoriya tanlang`, {
                reply_markup: {
                    keyboard: [
                        [{ text: "Ichimliklar" }, { text: "Yeguliklar" }],
                        [{ text: "Shirinliklar" }]
                    ],
                    resize_keyboard: true
                }
            });
        });


        this.bot.on('message', async (msg) => {
            const chatId = msg.chat.id;

            if (msg.text === "Ichimliklar") {
                await this.sendProducts(chatId, this.drinks);
            }
        });

        this.bot.on('callback_query', async (query) => {
            const chatId = query.message?.chat.id as number;
            const productId = query.data as string;

            const product = this.drinks.find((p) => p.id === productId);
            if (!product) return;

            await this.bot.sendInvoice(
                chatId,
                product.name,
                product.desc,
                productId,
                process.env.PAYMENT_PROVIDER_TOKEN as string,
                "UZS",
                [
                    {
                        label: product.name,
                        amount: product.price * 100,
                    }
                ],

            );
        });
    }

    private async sendProducts(chatId: number, list: any[]) {
        for (const item of list) {
            await this.bot.sendPhoto(chatId, item.photo, {
                caption: `
<b>${item.name}</b>
Narxi: <b>${item.price} so'm</b>
Tarkibi: ${item.desc}
                `,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "Buyurtma berish",
                                callback_data: item.id
                            }
                        ]
                    ]
                }
            });
        }
    }
}
