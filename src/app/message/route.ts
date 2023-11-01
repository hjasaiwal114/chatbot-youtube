import { MessageArraySchema } from "@/lib/validators/message"
import { MessageArraySchema } from "@/lib/validators/message"

export async function POST(req: Request) {
    const {messages} = await req.json()

    const paredMessages = MessageArraySchema.parse(messages)

    const outboundMessages: ChatGptMessage[] = parsedMessages.map((message) => ({
        role: message.isUserMessage ? 'user' : 'system',
        content: message.text,
    }))

    outboundMessages.unshift({
        role: 'system',
        content: chatbotPrompt
    })
}
    
