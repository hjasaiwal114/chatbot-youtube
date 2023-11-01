 'use client'
 
 import { cn } from '@/lib/utils'
 import { FC, HTMLAttributes, useState  } from 'react'
 import TextareaAutsize from 'react-textarea-autosize'
 import {nanoid} from 'nanoid'
import { Message } from '@/lib/validators/message'

 interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

 const ChatInput: FC<ChatInputProps> = ({ className, ...props }) => {
    const [input, setInput] = useState<string>('')

    const { mutate: sendMessage, isLoading } = useMutation({
        mutationFn: async (message: Message) => {
            const response = await fetch('/api/mesage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: 'hello' }),
            })

            return response.body
        },
        onSuccess: (stream) => {
            if(!stream) throw new Error('No stream found')

            const reader = stream.getReder()
            const decoder = new TextDecoder()
            let done = false

            while (!done) {
                const {value, done: doneReadng } = await reader.read()
                done = doneReadng
                const chunkValue = decoder.decode(value)
                console.log(chuckValue)
            }
        }
    })

    return (
        <div {...props} className = {cn('border-t border-zinc-300', className)}>
            <div className='relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none'>
                <TextareaAutsize 
                rows={2}
                onKeyDown={(e) => {
                    if(e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()

                        const message: Message = {
                            id: nanoid()
                            isUserInput: true,
                            text: input
                        }
                    }
                }}
                maxRows={4}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoFocus
                placeholder='Write a message...'
                className='peer disable: opacity-50 pr-14 resize-name block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6'
                />
            </div>
        </div>
    )
 }

 export default ChatInput 