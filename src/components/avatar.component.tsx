

interface AvatarProps {
    src: string
}

export const Avatar = ({
 src
}: AvatarProps) => {
    return (
        <div className=' max-w-12 rounded-full '>
            <img src={src} alt="avatar" />
        </div>
    )
}