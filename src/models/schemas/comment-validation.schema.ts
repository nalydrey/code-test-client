import { object, string } from "yup"
import { unclosedTags } from "../../functions/unclosed-tags"
import { ICommentForm } from "../../data/init-comment-form.data"
import { forbiddenTagList } from "../../functions/forbidden-tag-list"

const urlRegEx = new RegExp('(?:(?:ht|f)tps?://)?(?:[\\-\\w]+:[\\-\\w]+@)?(?:[0-9a-z][\\-0-9a-z]*[0-9a-z]\\.)+[a-z]{2,6}(?::\\d{1,5})?(?:[?/\\\\#][?!^$.(){}:|=[\\]+\\-/\\\\*;&~#@,%\\wА-Яа-я]*)?')
const emailRegEx = new RegExp('^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)(.[a-z]{2,6}$)')

const allowedTags = ['a', 'strong', 'i', 'code']

export const validationSchema = object<ICommentForm>({
    userName: string().required('Поле должно быть заполнено'),
    captcha: string().required(),
    avatar: string(),
    email: string().required('Поле должно быть заполнено').matches(emailRegEx, 'Формат ввода должен быть типа email (name@gmail.com)'),
    homePage: string().matches(urlRegEx, {message: 'домашняя страница должна соотсетствовать паттерну url' }),
    text: string()
    .test(
        'isCloseTags',
        (d) => { 
            const unclosed = unclosedTags(d.value, allowedTags)
            const isNotOne = unclosed.length>1
            return ` ${ isNotOne ? 'теги':'тег'} ${unclosed.join(', ')} не ${isNotOne ? 'закрыты':'закрыт'} или ${isNotOne ? 'написаны':'написан'} с ошибкой`
        },
        (value) => value ? !unclosedTags(value, allowedTags).length : true
    )
    .test(
        'isAllowedTags',
        (d) => {
            const tags = forbiddenTagList(d.value, allowedTags)
            const isMoreThanOne = tags.length > 1 ? true : false 
            return `нельзя использовать ${isMoreThanOne ? 'теги' : 'тег'} ${tags}`
        },
        (value) => !forbiddenTagList(value, allowedTags).length
        
    )
})