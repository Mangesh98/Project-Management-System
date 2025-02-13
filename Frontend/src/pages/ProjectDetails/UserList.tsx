import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAppDispatch, useAppSelector } from "@/Redux/Hook";
import { ProjectType } from "../ProjectList/ProjectList";
import { assigneIssueToUser, IssueType } from "@/Redux/Issue/Action";
interface UserListProps {
    issueDetails: IssueType
}
const UserList = ({issueDetails}:UserListProps) => {
    const projectDetails: ProjectType | undefined = useAppSelector((store) => store.project.projectDetails);
    const dispatch = useAppDispatch();
    const handleAssigneIssueToUser = (userId:number) => {
        console.log("userId",userId);
        
        dispatch(assigneIssueToUser({issueId:issueDetails.id,userId}))
    }
    return (
        <div className="space-y-2">

            <div className="border rounded-md">
                <p className="py-2 px-3">{ issueDetails.assignee?.fullName || "Unassigne"}</p>
            </div>
            {
                projectDetails?.team.map((teamMember, index) =>
                    <div onClick={()=>handleAssigneIssueToUser(teamMember.id)} key={index} className="py-2 group hover:bg-slate-800 cursor-pointer flex items-center space-x-4 rounded-md border px-4">
                        <Avatar>
                            <AvatarFallback>
                                {teamMember.fullName.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <p className="text-sm leading-none">{teamMember.fullName}</p>
                            <p className="text-sm text-muted-foreground">@{teamMember.fullName.replace(" ","").toLocaleLowerCase()}</p>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default UserList