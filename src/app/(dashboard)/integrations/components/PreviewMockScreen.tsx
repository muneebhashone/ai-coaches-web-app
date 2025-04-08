import type { ReactNode } from "react"

interface PreviewMockScreenProps {
    title: string
    description: string
    children: ReactNode
}

export function PreviewMockScreen({
    title,
    description,
    children
}: PreviewMockScreenProps) {
    return (
        <div className="w-full flex flex-col items-center">
            <h3 className="text-lg font-medium mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
            <div className="border rounded-lg w-full max-w-sm h-[400px] overflow-hidden shadow-sm">
                <div className="bg-primary h-10 text-primary-foreground flex items-center px-3 font-medium">
                    {title}
                </div>
                <div className="p-3 h-[calc(400px-2.5rem)] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    )
} 