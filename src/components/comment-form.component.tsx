import TextField from '@mui/material/TextField'
import { Button } from './button.component'
import { TextArea } from './text-area.component'
import { IconButton } from '@mui/material'
import { XMarkIcon } from '@heroicons/react/16/solid'
import { MouseEvent, useEffect, useState } from 'react'
import {useFormik} from 'formik'
import ReCAPTCHA from 'react-google-recaptcha'
import { TagButtons } from './tag-buttons.component'
import { validationSchema } from '../models/schemas/comment-validation.schema'
import { ICommentForm, initialValues } from '../data/init-comment-form.data'
import { ModalWindow } from './modal-window.compnent'
import { AvatarItem } from './avatar-card.component'
import { avatars } from '../data/avatars.data'
import { AvatarContainer } from './avatar-container.component'
import { Input } from './Input.component'
import defaultAvatar from '../assets/avatars/avatar_13.png'


interface CommentFormProps {
    onClose?: (e: MouseEvent<HTMLButtonElement>) => void
    onFormSubmit?: (form: ICommentForm ) => void
}

export const CommentForm = ({
    onClose,
    onFormSubmit

}: CommentFormProps) => {

    const [open, setOpen] = useState<boolean>(false)
    const [avatar, setAvatar] = useState<string>(defaultAvatar)

    const { errors, touched,  values, handleSubmit, handleChange, handleBlur, setValues } = useFormik<ICommentForm>({
        initialValues,
        validationSchema,
        onSubmit: (form) => {
            console.log('submit');
            onFormSubmit && onFormSubmit(form)
        }
    })

    useEffect(()=>{
        if(values.avatar){
            const currentAva = avatars.find(ava => ava.name === values.avatar)
            if(currentAva) setAvatar(currentAva.path)
            
        }

    }, [values.avatar])
  
    const handleRecaptchaChange = (value: string | null) => {
        setValues({...values, captcha: value ? value : ''})
    }
    
    const handleAddTag = (e: MouseEvent, text: string) => {
        const newText = `${values.text} ${text}` 
        setValues({...values, text: newText})
    }

    const handleAddAvatar = (name: string) => {
        setValues({...values, avatar: name})
        setOpen(false)
    } 

    const handleClickAddAvatar = () => {
        setOpen(true)
    }

    const handleClickOnEmptySpace = () => {
        setOpen(false)
    }

    

    return (
        <>
            <div className="relative bg-white rounded-lg px-5 pb-5 py-2 shadow-xl max-w-96">
                <div className='absolute right-0 top-0'>
                    <IconButton
                        onClick={onClose}
                    >
                        <XMarkIcon className='w-8'/>
                    </IconButton>
                </div>
                <h1 className="text-2xl font-bold text-center">Создать новый комментарий</h1>
                <form 
                    className='flex  flex-col gap-2 mt-5'
                    onSubmit={handleSubmit}
                >
                    <div className='mb-4 flex flex-col gap-3'> 
                        <Input
                            name='userName'
                            label = 'Имя пользователя'
                            icon={<img  src={avatar}/>}
                            value={values.userName}
                            error={!!touched.userName && !!errors.userName}
                            helperText = {touched.userName && touched.userName ? errors.userName : ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onClick={handleClickAddAvatar}
                        />
                        <Input
                            name='email'
                            label = 'Email'
                            value={values.email}
                            error={!!touched.email && !!errors.email}
                            helperText = {touched.email && errors.email ? errors.email : ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Input
                            name='homePage'
                            label = 'Домашняя страница'
                            value={values.homePage}
                            helperText={touched.homePage && errors.homePage ? errors.homePage : ''}
                            onChange={handleChange}
                        />
                        <TagButtons
                            onAddTag={handleAddTag}
                        />
                        <TextArea
                                name={'text'}
                                placeholder='Введите текст комментария'
                                value={values.text}
                                error={!!touched.text && !!errors.text}
                                helperText = {touched.text && errors.text ? errors.text: ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                        />
                    <ReCAPTCHA
                            className=' flex justify-center'
                            sitekey="6LdLo08pAAAAACgJgkQLl2fKG6gTjN3VSETIKGuC"
                            onChange={handleRecaptchaChange}
                        />
                    </div>
                    
                    <Button
                        type='submit'
                        title='Создать'
                    />
                </form>
            </div>
            <ModalWindow
                className='z-10'
                open={open}
                onEmptySpace={handleClickOnEmptySpace}
            >
              <AvatarContainer
                avatars={avatars}
                onChange={handleAddAvatar}
              />
            </ModalWindow>
        </>
    )
}