import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { AccordionTrigger } from "@radix-ui/react-accordion";
import { FC } from 'react' 

const Chat: FC = () =>{
    return (
        <Accordion
          type = 'single'
          collapsible
          className='realtive bg-white z-40 shadow' >
            <AccordionItem value ='Item-1'>
                <div className="flexed right-8 w-88 bottom-8 bg-white border border-grey-200 rounded-md overfow-hidden ">
                    <div className="w-full h-full flex-col">
                        <AccordionTrigger className='px-6 border-b border-zinc-300'>
                            <ChatHeader />
                        </AccordionTrigger>
                    </div>
                </div>
            </AccordionItem>
          </Accordion>
    )
}

export default Chat