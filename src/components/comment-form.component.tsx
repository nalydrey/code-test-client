import TextField from '@mui/material/TextField'
import { Button } from './button.component'
import { TextArea } from './text-area.component'
import { IconButton } from '@mui/material'
import { XMarkIcon } from '@heroicons/react/16/solid'
import { MouseEvent } from 'react'
import {useFormik} from 'formik'
import {object, string} from 'yup'
import ReCAPTCHA from 'react-google-recaptcha'
 


const initialValues = {
    userName: '',
    email: '',
    captcha: '',
    homePage: '',
    text: ''
}

type CommentForm = typeof initialValues

const urlRegEx = new RegExp('(?:(?:ht|f)tps?://)?(?:[\\-\\w]+:[\\-\\w]+@)?(?:[0-9a-z][\\-0-9a-z]*[0-9a-z]\\.)+[a-z]{2,6}(?::\\d{1,5})?(?:[?/\\\\#][?!^$.(){}:|=[\\]+\\-/\\\\*;&~#@,%\\wА-Яа-я]*)?')
const emailRegEx = new RegExp('^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)(.[a-z]{2,6}$)')

const validationSchema = object<CommentForm>({
    userName: string().required('Поле должно быть заполнено'),
    captcha: string().required(),
    email: string().required('Поле должно быть заполнено').matches(emailRegEx, 'Формат ввода должен быть типа email (name@gmail.com)'),
    homePage: string().matches(urlRegEx, {message: 'домашняя страница должна соотсетствовать паттерну url' }),
    text: string().required()
})




interface CommentFormProps {
    onClose?: (e: MouseEvent<HTMLButtonElement>) => void
    onFormSubmit?: (form: CommentForm ) => void
}

export const CommentForm = ({
    onClose,
    onFormSubmit

}: CommentFormProps) => {

    const { errors, touched,  values, handleSubmit, handleChange, handleBlur, setValues } = useFormik<CommentForm>({
        initialValues,
        validationSchema,
        onSubmit: (form) => {
            console.log('submit');
            onFormSubmit && onFormSubmit(form)
        }
    })

    console.log(errors);

  
    const handleRecaptchaChange = (value: string | null) => {
        console.log(value);
        setValues({...values, captcha: value ? value : ''})
    }
    

    return (
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
                    <TextField
                        name='userName'
                        variant='outlined'
                        fullWidth
                        label = 'Имя пользователя'
                        value={values.userName}
                        error={!!touched.userName && !!errors.userName}
                        helperText = {touched.userName && touched.userName ? errors.userName : ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        name='email'
                        variant='outlined'
                        fullWidth
                        label = 'Email'
                        value={values.email}
                        error={!!touched.email && !!errors.email}
                        helperText = {touched.email && errors.email ? errors.email : ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        name='homePage'
                        variant='outlined'
                        fullWidth
                        label = 'Домашняя страница'
                        value={values.homePage}
                        helperText={touched.homePage && errors.homePage ? errors.homePage : ''}
                        onChange={handleChange}
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
                    type='button'
                    title='Добавить аватар'
                />
                <Button
                    type='submit'
                    title='Создать'
                />
            </form>
        </div>
    )
}