import { Button } from './button.component'
import { TextArea } from './text-area.component'
import { IconButton } from '@mui/material'
import { XMarkIcon } from '@heroicons/react/16/solid'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import {useFormik} from 'formik'
import ReCAPTCHA from 'react-google-recaptcha'
import { TagButtons } from './tag-buttons.component'
import { validationSchema } from '../models/schemas/comment-validation.schema'
import { ICommentForm, initialValues } from '../data/init-comment-form.data'
import { ModalWindow } from './modal-window.compnent'
import { avatars } from '../data/avatars.data'
import { AvatarContainer } from './avatar-container.component'
import { Input } from './Input.component'
import defaultAvatar from '../assets/avatars/avatar_13.png'
import { PreviewLabel } from './preview-label.component'
import { AvatarItem } from './avatar-card.component'



interface CommentFormProps {
    onClose?: (e: MouseEvent<HTMLButtonElement>) => void
    onFormSubmit?: (form: ICommentForm, file: File | null ) => void
    onClickDetail?: (file: File) => void
}

export const CommentForm = ({
    onClose,
    onFormSubmit,
    onClickDetail

}: CommentFormProps) => {


    const [open, setOpen] = useState<boolean>(false)
    const [avatar, setAvatar] = useState<string>(defaultAvatar)
    const [file, setFile] = useState<File | null>(null)

    const { errors, touched,  values, handleSubmit, handleChange, handleBlur, setValues } = useFormik<ICommentForm>({
        initialValues,
        validationSchema,
        onSubmit: (form) => {
            onFormSubmit && onFormSubmit(form, file)
        }
    })

    useEffect(()=>{
        if(values.avatar){
            const currentAva = avatars.find(ava => ava.name === values.avatar)
            if(currentAva) setAvatar(currentAva.path)
        }
    }, [values.avatar])


    // handlers //////////////////////////////////////////////////////////////////

    
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

    const handlerChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            const file = e.target.files[0]
            setFile(file)
        }
    }

    const hendlerResetFile = () => {
        setFile(null)
    }

    const handleClickDetail = () => {
        if(file && onClickDetail){
          onClickDetail(file)
        }
    }

    /////////////////////////////////////////////////////////////////////////////////
    
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
                <AvatarItem
                    className='absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 border-none'
                    src={avatar}
                    onClick={handleClickAddAvatar}
                />
                <h1 className="text-2xl font-bold text-center">Создать новый комментарий</h1>
                <form 
                    className='flex  flex-col gap-2 mt-5'
                    onSubmit={handleSubmit}
                >
                    <div className='mb-4 flex flex-col gap-3'> 
                        <Input
                            name='userName'
                            label = 'Имя пользователя'
                            value={values.userName}
                            error={!!touched.userName && !!errors.userName}
                            helperText = {touched.userName && touched.userName ? errors.userName : ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
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
                        <div className='relative flex flex-col gap-2'>
                            <TagButtons
                                onAddTag={handleAddTag}
                                onChange={handlerChangeFile}
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
                            {
                                file &&
                                <PreviewLabel
                                    className='absolute bottom-2 right-4'
                                    file={file}
                                    onDelete={hendlerResetFile}
                                    onShow={handleClickDetail}
                                />
                            }
                                
                        </div>
                    <ReCAPTCHA
                            className=' flex justify-center'
                            sitekey={import.meta.env.VITE_PUCLIC_KEY}
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