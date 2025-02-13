import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import CreateCommentForm from "./CreateCommentForm";
import CommentCard from "./CommentCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/Redux/Hook";
import { useEffect } from "react";
import { fetchIssueById, updateIssueStatus } from "@/Redux/Issue/Action";

const IssueDetails = () => {
    const { projectId, issueId } = useParams<{ projectId: string, issueId: string }>();
    const dispatch=useAppDispatch();
    const {issueDetails}=useAppSelector((state)=>state.issue);
    const handleUpdateIssueStatus=(value: string)=>{
        if(issueId===undefined) return;
        dispatch(updateIssueStatus(parseInt(issueId),value));
    }
    useEffect(() => {
        if(issueId===undefined) return;
        dispatch(fetchIssueById(parseInt(issueId)));
    },[])
    return (
        <div className="px-20 py-8 text-gray-400">
            <div className="flex justify-between border p-10 rounded-lg">
                <ScrollArea className="w-[60%] h-[80vh]">
                    <div className="">
                        <h1 className="text-lg font-semibold text-gray-400">{issueDetails?.title}</h1>
                        <div className="py-5">
                            <h2 className="font-semibold text-gray-400">Description</h2>
                            <p className="text-gray-400 text-sm mt-3">{issueDetails?.description}</p>
                        </div>
                        <div className="mt-5 ">
                            <h1 className="pb-3">Activity</h1>
                            <Tabs defaultValue="comments" className="w-[400px]">
                                <TabsList className="mb-5">
                                    <TabsTrigger value="all">All</TabsTrigger>
                                    <TabsTrigger value="comments">Comments</TabsTrigger>
                                    <TabsTrigger value="histroy">History</TabsTrigger>
                                </TabsList>
                                <TabsContent value="all">
                                    All make changes to your account here
                                </TabsContent>
                                <TabsContent value="comments">
                                    {issueId && <CreateCommentForm issueId={issueId} />}
                                    <div className="mt-8 space-y-6 ">
                                        {
                                            [1, 2, 3].map((issue) =>
                                                <CommentCard key={issue} />
                                            )
                                        }
                                    </div>
                                </TabsContent>
                                <TabsContent value="histroy">
                                    History of the project
                                </TabsContent>

                            </Tabs>
                        </div>
                    </div>
                </ScrollArea>
                <div className="w-full lg:w-[30%] space-y-2">
                    <Select onValueChange={handleUpdateIssueStatus}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="To Do" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">To Do</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                    </Select>

                <div className="border rounded-lg">
                    <p className="border-b py-3 px-5">Details</p>
                    <div className="p-5">
                        <div className="space-y-7">
                            <div className="flex gap-10 items-center">
                                <p className="w-[7rem]">Assignee</p>
                                {issueDetails?.assignee ? 
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8 text-xs">
                                        <AvatarFallback>
                                           {issueDetails.assignee.fullName.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <p>{issueDetails.assignee.fullName}</p>
                                </div>
                                :
                                <p>unassigned</p>}
                            </div>
                            <div className="flex gap-10 items-center">
                                <p className="w-[7rem]">Labels</p>
                                <p>None</p>
                            </div>
                            <div className="flex gap-10 items-center">
                                <p className="w-[7rem]">Status</p>
                                <Badge>
                                    {issueDetails?.status}
                                </Badge>
                            </div>
                            <div className="flex gap-10 items-center">
                                <p className="w-[7rem]">Realease</p>
                                <p>10-04-2025</p>
                            </div>
                            <div className="flex gap-10 items-center">
                                <p className="w-[7rem]">Reporter</p>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8 text-xs">
                                        <AvatarFallback>
                                            R
                                        </AvatarFallback>
                                    </Avatar>
                                    <p>Ram</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                </div>
            </div>
        </div>
    )
}

export default IssueDetails