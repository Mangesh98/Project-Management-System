import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { UserState } from '@/Redux/Auth/Reducer'
import { fetchChatByProject, fetchChatMessages, MessageType, sendMessage } from '@/Redux/Chat/Action'
import { ChatState } from '@/Redux/Chat/Reducer'
import { useAppDispatch, useAppSelector } from '@/Redux/Hook'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ChatBox = () => {
  const auth: UserState = useAppSelector(state => state.auth);
  const chat: ChatState = useAppSelector(state => state.chat);
  const [message, setMessage] = useState<string>('')
  const { projectId } = useParams<{ projectId: string }>();
  const dispatch = useAppDispatch();
  const handleMessageChange = (e: any) => {
    setMessage(e.target.value);
  }

  const handleSendMessage = () => {
    let senderID = auth.user?.id;
    if (senderID === null || senderID === undefined || projectId === undefined) return;
    dispatch(sendMessage({ senderID, projectID: parseInt(projectId), content: message }));
    setMessage('')
  }
  useEffect(() => {
    if (projectId === undefined) return;
    dispatch(fetchChatByProject(parseInt(projectId)));
    if (chat.chat === null || chat.chat === undefined) return;
    dispatch(fetchChatMessages(chat.chat?.id));
  }, [projectId]);

  return (
    <div className='sticky '>
      <div className="border rounded-lg">
        <h1 className='border-b p-5'>
          Chat Box
        </h1>
        <ScrollArea className='h-[32rem] w-full p-5 flex gap-3 flex-col'>
          {
            chat.messages.map((message, index) =>
              message.sender.id!==auth.user?.id ? <div key={index} className='flex gap-2 mb-2 justify-start'>
                <Avatar>
                  <AvatarFallback>
                    {message.sender.fullName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2 py-2 px-5 border rounded-ss-2xl rounded-e-xl ">
                  <p>{message.sender.fullName}</p>

                  <p className='text-gray-300'>{message.content} </p>
                </div>

              </div> :
                <div key={index} className='flex gap-2 mb-2 justify-end'>
                  <div className="space-y-2 py-2 px-5 border rounded-se-2xl rounded-s-xl ">
                    <p>{message.sender.fullName}</p>
                    <p className='text-gray-300'>{message.content}</p>
                  </div>
                  <Avatar>
                    <AvatarFallback>
                      {message.sender.fullName[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
            )
          }       
        </ScrollArea>
        <div className="relative p-0">
          <Input value={message} onChange={(handleMessageChange)} placeholder="Type a message" className='py-7 outline-none border-t focus:outline-none focus:ring-0 rounded-none border-b-0 border-x-0' />
          <Button onClick={handleSendMessage} className='absolute right-2 top-3 rounded-full' size={"icon"} variant={"ghost"}><PaperPlaneIcon /></Button>
        </div>
      </div>

    </div>
  )
}

export default ChatBox