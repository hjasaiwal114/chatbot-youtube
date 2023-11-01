import { ParsedEvent, ReconnectInterval} from "eventsource-parser"

export type ChatGptAgent = "user" | "system"

export interface ChatGptMessage {
    role: ChatGptAgent
    content: string
}

export interface OpenAIStreamPayload  {
    model: 'gpt-3.5-turbo',
    message: ChatGptMessage[],
    temperature: 0.4,
    top_p: 1,
    frequency_penalty: 0,
    presence_penality: 0,
    max_token: 150,
    stream: true,
    n: 1,
}

export async function OpenAIStream(payload: OpenAIStreamPayload) {
    const  encoder = next TextEncoder()
    const decoder = next TextDecoder()

    let counter = 0

    const res = await fetch('http://api.openai.com/vi/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify(payload),
    })

    const stream = new ReadableStream({
         async start(controller) {
            function onParse(event: ParsedEvent | ReconnectInterval) {
                if (event.type === 'event') {
                    const data = event.data
                    if(data === '[DONE]') {
                        controller.close()
                        return
                        
                    }
                    try {
                        const json = JSON.parse(data)
                        console.log("json", json)
                        const text = json.choce[0].data?.content || ''

                        if(counter > 2 && (text.match(/\n/)|| []).length) {
                            return 
                        }

                        const queue = encoder.encode(text)
                        controller.enqueue(queue)

                    } catch (error) {
                        controller.error(error)
                    }
                }
            }

            const parser = createParser(onParse)

            for await (const chunk of res.body as any) {
                parser.feed(decoder.decode(chunk))
            }
         }
    })
}