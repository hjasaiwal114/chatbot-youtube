"use client"

import { MessagesContext } from '@/context/messages'
import { FC, HTMLAttributes, useContext } from 'react'

interface CHatMessagesProps extends HTMLAttributes<HTMLDivElement> {}

const chatMessages: FC<CHatMessagesProps> = ({ className, ...props }) => {
    const { messages } = useContext(MessagesContext)
    const inverseMessages = [...messages].reverse()

    return <div {...props} className={cn(
        'flex flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch',
         className
    )}>
        <div className='flex-1 flex-grow' />
        {inverslyMessages.map((message) => (
            <div key={message.id} className='chat-message'>
                <div
                  className={cn('flex items-end', {
                    'justify-end': message.isuseMessage,
                  })}>
                  <div className={cn('flex flex-col sace-y-2 text-sm max-w-xs mx-2 overflow-x-hidden', {
                    'bg-blue-600 text-white': message.isUserMessage,
                    'bg-gray-200 text-gray-900': !message.isUserMessage,
                  }
                  )}>
                    <p className= {cn('px-4 py-2 rounded-lg', {
                        'bg-blue-600 text-white': message.isUserMessage,
                        'bg-gray-200 text-gray-900': !message.isUserMessage,
                    })}></p>
                    {/* <MarkdownLite text={message.text} /> */}
                    {message.text}
                  </div>
                  </div>
                </div>
        ))}
        chatMessages
        </div>
}

export default ChatMessages