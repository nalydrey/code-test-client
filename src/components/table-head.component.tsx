import { KeyboardDoubleArrowDown } from "@mui/icons-material"
import { IconButton, TableCell, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"

export interface Sort {
        user?: {
            userName?: 'ASC' | 'DESC'
            email?: 'ASC' | 'DESC'
        }
        createdDate?: 'ASC' | 'DESC'
        id?: 'ASC' | 'DESC'
}

interface CommentTableHeadProps {
    onSort: (sort: Sort) => void
}

export const CommentTableHead = ({
    onSort
}: CommentTableHeadProps) => {

    const [state, setState] = useState<{name: string, dir: boolean}>({name: '', dir: false})

    useEffect(()=>{
        switch(state.name){
            case 'name': {
                onSort({user: {userName: state.dir ? 'ASC' : 'DESC'}})
                break
            }
            case 'email': {
                onSort({user: {email: state.dir ? 'ASC' : 'DESC'}})
                break
            }
            case 'date': {
                onSort({createdDate: state.dir ? 'ASC' : 'DESC'})
                break
            }
            default : {
                onSort({id: 'DESC'})
            }
        }

    }, [state])

    console.log(state);
    

    const handleClick = ( name: string) => {
        name === state.name 
        ? setState({name, dir: !state.dir})
        : setState({name, dir: true})
    }

    return (
        <TableHead >
            <TableRow>
               <TableCell>Управление</TableCell>
               <TableCell>Аватар</TableCell>
               <TableCell>
                    <div className="flex justify-center items-center gap-1">
                        <div className={` duration-200 ${state.name === 'name' && state.dir  ? 'rotate-180':' rotate-0'}`}>
                            <IconButton 
                                onClick={() => {handleClick('name')}}
                            >
                                <KeyboardDoubleArrowDown />

                            </IconButton>
                        </div>
                        <div>Имя пользователя</div>
                    </div>
               </TableCell>
               <TableCell>
                    <div className="flex justify-center items-center gap-1">
                        <div className={` duration-200 ${state.name === 'email' && state.dir ? 'rotate-180':' rotate-0'}`}>
                            <IconButton
                                onClick={() => {handleClick('email')}}
                            >
                                <KeyboardDoubleArrowDown/>
                            </IconButton>
                        </div>
                        <div>Email</div>
                    </div>
               </TableCell>
               <TableCell>
                    <div className="flex justify-center items-center gap-1">
                        <div className={` duration-200 ${state.name === 'date' && state.dir ? 'rotate-180':' rotate-0'}`}>
                            <IconButton
                                onClick={() => {handleClick('date')}}
                            >
                                <KeyboardDoubleArrowDown/>
                            </IconButton>
                        </div>
                        <div>Дата</div>
                    </div>
               </TableCell>
               <TableCell>Домашняя страница</TableCell>
               <TableCell>Текст</TableCell>
               <TableCell>Файл</TableCell>
            </TableRow>
        </TableHead>
    )
}