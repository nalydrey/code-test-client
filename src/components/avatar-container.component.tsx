import { IAvatar } from "../models/avatar.model"
import { AvatarItem } from "./avatar-card.component"

interface AvatarContainerProps {
    avatars: IAvatar[]
    onChange?: (name: string) => void

}

export const AvatarContainer = ({
    avatars,
    onChange
}: AvatarContainerProps) => {
    return (
        <div className='bg-white p-4 rounded-lg shadow-xl'>
        <h2 className='text-xl font-bold mb-5 text-center'>Выберете аватар</h2>
        <div className='grid grid-cols-4 gap-3'>
            {avatars.map(avatar => (
                <AvatarItem
                    src={avatar.path}
                    title={avatar.name}
                    onClick={() => onChange && onChange(avatar.name)}
                />
            ))}
        </div>
    </div>
    )
}