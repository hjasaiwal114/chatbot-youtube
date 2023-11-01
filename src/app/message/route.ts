import { ChatGptMessage, OpenAIStreamPayload } from "@/lib/openai-stream"
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

    const payload: OpenAIStreamPayload = {
        model: 'gpt-3.5-turbo',
        message: outboundMessages,
        temperature: 0.4,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_token: 150,
        stream: true,
        n: 1
    }

    const stream = await  OpenAIStream(payload)

    return new Response(stream)
}
    
