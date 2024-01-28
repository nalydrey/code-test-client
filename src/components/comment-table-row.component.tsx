import { avatars } from "../data/avatars.data"
import defaultAvatar from "../assets/avatars/avatar_13.png"
import { Comment } from "../models/comment.model"
import { MouseEvent, useEffect, useMemo, useRef, useState } from "react"
import { Collapse, IconButton, Menu, TableCell, TableRow } from "@mui/material"
import { Avatar } from "./avatar.component"
import { PreviewFile } from "./preview-file.component"
import { getExtantion } from "../functions/get-extention"
import moment from "moment"
import { DeleteForeverOutlined, KeyboardArrowDownOutlined, KeyboardArrowUpOutlined, ReplyOutlined } from "@mui/icons-material"
import { MessageCard } from "./message-card.component"
import { ContentSection } from "./content-section.component"
import { Reply } from "./reply.component"
import { IFile } from "../models/file.model"
import { toHTML } from "../functions/toHTML"
import { Paragraph } from "./paragraph"
import { blueGrey } from "@mui/material/colors"

interface CommentTableRowProps {
    isLoading: boolean
    comment: Comment
    onShowFile?: (e: IFile | null) => void
    onReply?: (id: number) => void
    onDelete?: (id: number) => void
}

export const CommentTableRow = ({
    isLoading,
    comment,
    onShowFile,
    onDelete,
    onReply
}: CommentTableRowProps) => {

    const but = useRef<HTMLButtonElement>(null)

    const [anchorElHomePage, setAnchorElPage] = useState<HTMLElement | null>(null) 
    const [anchorElText, setAnchorElText] = useState<HTMLElement | null>(null) 
    const [open, setOpen] = useState<boolean>()


    useEffect(() => {
        toHTML(but, comment.text)
    }, [comment.text])
    

    const avatar = useMemo(() => {
        return avatars.find(ava => ava.name === comment.user.avatar)?.path || defaultAvatar 
    }, [])


    const hanleOpenAnchorElPage = (e: MouseEvent<HTMLButtonElement>) => {
        setAnchorElPage(e.currentTarget)
    }
    
    const handleCloseAnchoreElPage = () => {
        setAnchorElPage(null)
    }
    
    const hanleOpenAnchorElText = (e: MouseEvent<HTMLButtonElement>) => {
        setAnchorElText(e.currentTarget)
    }
    
    const handleCloseAnchoreElText = () => {
        setAnchorElText(null)
    }

    const handleShow = (file: IFile | null) => {
        console.log(file);
        
        onShowFile && onShowFile(file)
    }
    
    const handleDelete= (id: number) => {
        onDelete && onDelete(id)
    }
    
    const handleReply = (id: number) => {
        onReply && onReply(id)
    }

    return (
        <>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0}, position: 'relative' }}
            >
                <TableCell>
                    { isLoading && <span className=" absolute z-10 bg-gray-300/70 backdrop-blur-[2px] top-0 left-0 w-full h-full "></span>} 
                    <div className="flex">
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? < KeyboardArrowUpOutlined /> : < KeyboardArrowDownOutlined />}
                        </IconButton>
                        <IconButton
                            onClick = {() => handleReply(comment.id)}
                        >
                            <ReplyOutlined/>
                        </IconButton>
                        <IconButton
                            onClick = {() => handleDelete(comment.id)}
                        >
                            <DeleteForeverOutlined/>
                        </IconButton>
                    </div>
                </TableCell> 
                <TableCell align="center">
                    <Avatar
                        src = {avatar}
                    />
                </TableCell>
                <TableCell align="center">{comment.user.userName}</TableCell>
                <TableCell align="center">{comment.user.email}</TableCell>
                <TableCell align="center">{moment(comment.createdDate).format('lll')}</TableCell>
                <TableCell align="center">
                    {
                        comment.user.homePage ?
                        <button
                            onClick={hanleOpenAnchorElPage}
                        >
                            {comment.user.homePage.slice(0, 25)+'...'}
                        </button>
                        :
                        <p>Нет домашней страницы</p>
                    }
                </TableCell>
                <TableCell align="center">
                    <button
                        ref = {but}
                        onClick = {hanleOpenAnchorElText}
                    >
                        {comment.text}
                    </button>
                </TableCell>
                <TableCell align="center">
                    {
                        comment.file ?
                        <PreviewFile
                            ext={getExtantion(comment.file.name)}
                            onClick={() => handleShow(comment.file)}
                        />  
                        :
                        <p>Нет файлов</p>  
                    }
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ padding: 0 }} colSpan={10}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <div className="p-2">
                            <MessageCard
                                avaSrc={avatar}
                                userName={comment.user.userName}
                                file={comment.file}
                                onDelete={() => handleDelete(comment.id)}
                                onShow={() => handleShow(comment.file)}
                                onReply={() => handleReply(comment.id)}
                            >
                                <ContentSection
                                    text={comment.text}
                                />
                                {
                                    comment.reply.map(item => (
                                    <Reply
                                        reply={item}
                                        onDelete={handleDelete}
                                        onShow={handleShow}
                                        onReply={handleReply}
                                    />
                                    ))
                                }
                            </MessageCard>
                        </div>
                    </Collapse>
                </TableCell>
            </TableRow>
           

            <Menu
                anchorEl={anchorElHomePage}
                open={!!anchorElHomePage}
                onClose={handleCloseAnchoreElPage}
            >
                <p className="px-3">{comment.user.homePage}</p> 
            </Menu>

            <Menu
                anchorEl={anchorElText}
                open={!!anchorElText}
                onClose={handleCloseAnchoreElText}
            >
                <Paragraph
                    text={comment.text}
                />
            </Menu>
        </>
    )
}