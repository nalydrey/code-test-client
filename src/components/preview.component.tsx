import { useFileSelector } from "../hooks/useFileSelector"

interface PreviewProps {
    blob: Blob
    fileName: string
}

export const Preview = ({
    blob,
    fileName
}: PreviewProps) => {

    const {isDocument, isPicture, payload} = useFileSelector({blob, name: fileName})

    return (
        <div>
            {
                isDocument &&
                <p className='bg-white rounded-lg p-3 shadow-xl'>{payload}</p>
            }
            {
                isPicture && 
                <img src={payload} alt="" />
            }
        </div>
    )
}