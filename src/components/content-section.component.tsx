
interface ContentSectionProps {
    text: string
}

export const ContentSection = ({
    text
}: ContentSectionProps) => {
    return (
        <div
            className="py-2"
        >
            {text}
        </div>
    )
}