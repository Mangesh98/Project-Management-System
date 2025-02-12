import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons";
import UserList from "./UserList";
import { useNavigate } from "react-router-dom";
import { IssueType } from "@/Redux/Issue/Action";



const IssueCard = (issue:IssueType) => {
	const navigate = useNavigate();
	console.log(issue);
	return (
		<Card className="rounded-md py-1 pb-2">
			<CardHeader className="py-0 pb-1">
				<div className="flex justify-between items-center">
					<CardTitle
						onClick={() => navigate(`/project/${issue.projectId}/issue/${issue.id}`)}
						className="text-sm cursor-pointer"
					>
						Issue Title
					</CardTitle>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button className="rounded-full" size={"icon"} variant="ghost">
								<DotsVerticalIcon />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>In Progress</DropdownMenuItem>
							<DropdownMenuItem>Done</DropdownMenuItem>
							<DropdownMenuItem>Edit</DropdownMenuItem>
							<DropdownMenuItem>Delete</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex items-center justify-between">
					<p>FBP - {1}</p>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button
								className="rounded-full bg-gray-900 hover:text-black text-white"
								size={"icon"}
								variant="ghost"
							>
								<Avatar>
									<AvatarFallback>
										<PersonIcon />
									</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<UserList />
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardContent>
		</Card>
	);
};

export default IssueCard;
