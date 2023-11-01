export type ChatGptAgent = "user" | "system"

export interface ChatGptMessage {
    role: ChatGptAgent
    content: string
}