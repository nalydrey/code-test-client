import { useEffect, useState } from 'react'
import preloader from '../assets/svg/tube-spinner.svg'
import { CircularProgress } from '@mui/material'

interface AvatarProps {
    src: string
}

export const Avatar = ({
 src
}: AvatarProps) => {

    const [isLoading, setLoading] = useState<boolean>(true)

    useEffect(()=>{
        const img = new Image()
        img.src = src
        img.onload = () => {
            setLoading(false)
        }
    }, [src])

    return (
        <div className='max-w-12 rounded-full w-[47px] h-[47px]  '>
            {isLoading && <CircularProgress color="inherit" />}
            <img src={src} alt="avatar" className={`${isLoading ? 'w-0 h-0' : ''}`} />
        </div>
    )
}