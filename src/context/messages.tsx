import { createContext, useState } from "react";
import { nanoid } from 'nanoid'
import { Message } from "@/lib/validators/message";

const defaultValue = [
    {
        id: nanoid(),
        text: 'Hello, how can I help you?',
        isSecureContext: false,
    },
]
export const MessageContext = createContext<{
    messages: Message[]
    isMessageUpdating: boolean
    addMessage: (message: Message) => void
    removeMessage: (id: string) => void
    updateMessage: (id: string, uodateFn: (prevText: string) => string) => void
    setIsMessageupdating: (isUpdating: boolean) => void
}>({
    messages: [],
    isMessageUpdating: false,
    addMessage: () => {},
    removeMessage: () => {},
    updateMessage: () => {},
    setIsMessageupdating: () => {},
})

export function MessageProvider({ children }: {children: React.ReactNode }) {
    const [message, setMessage] = useState(defaultValue)
    const [isMessageUpdating, setIsMessageupdating] = useState<boolean>(false)

    const addMessage = (message: Message) => {
        setMessage((prev) => [...prev, message])
    }

    const removeMessage = (id: string) => {
        setMessage((prev) => prev.filter((message) => message.id !== id))
    }

    const updateMessage =(
        id: string,
        updateFn: (prevText: string) => string
    ) => {
        setMessage((prev) => 
          prev.map((message) => {
            if (message.id === id) {
                return { ...message, text: updateFn(message.text) }
            }
            return message
          })
        )
    }
    


return (
    <MessageContext.Provider
      value={{
        messages,
        isMessageUpdating,
        addMessage,
        removeMessage,
        updateMessage,
        setIsMessageupdating,
      }}>
        {children}
      </MessageContext.Provider>
)

}