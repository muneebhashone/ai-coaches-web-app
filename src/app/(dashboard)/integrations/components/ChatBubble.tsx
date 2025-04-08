import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ChatBubbleProps {
    message: string
    isUser?: boolean
}

export function ChatBubble({ message, isUser = false }: ChatBubbleProps) {
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
            {!isUser && (
                <Avatar className="mr-2">
                    <AvatarImage src="/images/ai-coach-avatar.png" alt="AI Coach" />
                    <AvatarFallback>AC</AvatarFallback>
                </Avatar>
            )}
            <div
                className={`px-3 py-2 rounded-lg max-w-[70%] ${isUser
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/60'
                    }`}
            >
                {message}
            </div>
            {isUser && (
                <Avatar className="ml-2">
                    <AvatarImage src="/images/user-avatar.png" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
            )}
        </div>
    )
} 