import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { TrashIcon } from "lucide-react"
import { CommentType } from "./IssueDetails"
import { useAppDispatch } from "@/Redux/Hook";
import { deleteComment } from "@/Redux/Comment/Action";

interface CommentCardProps {
    comment:CommentType;
}

const CommentCard = ({comment}:CommentCardProps) => {
    const dispatch=useAppDispatch();
    const handleCommentDelete=(commentId:number)=>{
        dispatch(deleteComment(commentId));
    }
    return (
        <div className="flex justify-between">
            <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarFallback>
                        {comment.user.fullName[0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                    <p>{comment.user.fullName}</p>
                    <p>{comment.content}</p>
                </div>
            </div>
            <Button onClick={()=>handleCommentDelete(comment.id)} className="rounded-full" variant={"ghost"} size={"icon"}>
                <TrashIcon />
            </Button>

        </div>
    )
}

export default CommentCard