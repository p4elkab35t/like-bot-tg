export default {

	API_KEY: '',
	API_SECRET: '',
	LIKED_USERNAME: '',
	HATED_USERNAME: '',
	TELEGRAM_URL: '',

	async fetch(request, env, ctx) {
		this.API_KEY = env.ENV_BOT_TOKEN;
        this.API_SECRET = env.ENV_BOT_SECRET;
        this.LIKED_USERNAME = env.ENV_LIKED_USERNAME? env.ENV_LIKED_USERNAME : '';
        this.HATED_USERNAME = env.ENV_HATED_USERNAME? env.ENV_HATED_USERNAME : '';
		this.TELEGRAM_URL = `https://api.telegram.org/bot${this.API_KEY}/setMessageReaction?secret_token=${this.API_SECRET}`;
		return (await this.handleRequest(request));
	},

	async handleRequest(request) {
		try {
			const payload = await request.json();
			if (request.method !== "POST") {
				console.log("wrong method")
				return new Response(`Wrong method`, { status: 200 });
			}
			if (!payload) {
				console.log("no payload")
				return new Response(`No payload`, { status: 200 });
			}
			if (!('message' in payload)) {
				console.log("no message")
				return new Response(`No message`, { status: 200 });
			}
			if (!payload.message) {
				console.log("no message")
				return new Response(`No message`, { status: 200 });
			}

            const chanceOfReaction = (Math.floor(Math.random() * 20) + 1)==20? true : false;
            if (!chanceOfReaction) {
                return new Response('OK');
            }
			const chatId = payload.message.chat.id;
			const messageId = payload.message.message_id;
            const senderUserName = payload.message.from.username;
            
            console.log("senderId", senderUserName);

            if (senderUserName == this.LIKED_USERNAME) {
                await this.setReaction(chatId, messageId, ['👍', '❤️', '😍', '😂'][Math.floor(Math.random() * 3)]);
            }
            else if (senderUserName == this.HATED_USERNAME) {
                await this.setReaction(chatId, messageId, ['👎', '😡', '💩', '🤡'][Math.floor(Math.random() * 3)]);
            }
            else {
                await this.setReaction(chatId, messageId, ['👍', '👎', '❤️', '😍', '😂', '😡', '🤡', '💩'][Math.floor(Math.random() * 7)]);
            }
			

			return new Response('OK');
		} catch (err) {
			return new Response(err.stack || err);
		}
	},

	async setReaction(chatId, messageId, response) {
        const params = new URLSearchParams({
            chat_id: chatId,
            message_id: messageId,
            reaction: JSON.stringify([{
                type: "emoji",
                emoji: response
            }])
        })

        console.log("params", params.toString());
        console.log("url", `${this.TELEGRAM_URL}&${params.toString()}`);
		const url = `${this.TELEGRAM_URL}&${params.toString()}`;
		const data = await fetch(url).then(resp => resp.json());
        console.log(data);
		return data;
	}
}