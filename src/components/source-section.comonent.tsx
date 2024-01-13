
interface SourceSectionProps {
    text: string
}

export const SourceSection = ({
    text
}: SourceSectionProps) => {
    return (
        <div className="bg-green-300/20 px-2 py-1 border-l-4 border-green-700 rounded-sm">
            {text}
        </div>
    )
}