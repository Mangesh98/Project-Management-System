import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusIcon } from "@radix-ui/react-icons";
import InviteUserForm from "./InviteUserForm";
import IssueList from "./IssueList";
import ChatBox from "./ChatBox";
import { useAppDispatch, useAppSelector } from "@/Redux/Hook";
import { fetchProjectById } from "@/Redux/Project/Action";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProjectType } from "../ProjectList/ProjectList";

const ProjectDetails = () => {
	const dispatch = useAppDispatch();
	const projectDetails: ProjectType | undefined = useAppSelector((store) => store.project.projectDetails);
	const { projectId } = useParams();

	useEffect(() => {
		if (!projectId) return;
		dispatch(fetchProjectById({ id: projectId }));
	}, [projectId]);

	const handleProjectInvitation = () => {
		// TODO: handle project invitation
	};

	return (
		<div className="mt-5 lg:px-10 ">
			{projectDetails ? (
				<div className="gap-5 lg:flex justify-between pb-4">
					<ScrollArea className="h-screen lg:w-[69%] pr-2">
						<div className="pb-10 w-full text-gray-400">
							<h1 className="pb-5 font-semibold text-lg">
								{projectDetails.name}
							</h1>
							<div className="pb-10 space-y-5  text-sm">
								<p className="w-full md:max-w-lg lg:max-w-xl">
									{projectDetails.description}
								</p>
								<div className="flex">
									<p className="w-36">Project Lead :</p>
									<p>{projectDetails.owner?.fullName}</p>
								</div>
								<div className="flex">
									<p className="w-36">Members :</p>
									<div className="flex gap-2 items-center">
										{projectDetails.team.map((teamMember) => (
											<Avatar key={teamMember.id} className="cursor-pointer ">
												<AvatarFallback>
													{teamMember.fullName.charAt(0)}
												</AvatarFallback>
											</Avatar>
										))}
									</div>
									<Dialog>
										<DialogTrigger>
											<DialogClose>
												<Button
													className="ml-2"
													variant="ghost"
													size={"sm"}
													onClick={handleProjectInvitation}
												>
													<span>invite</span>
													<PlusIcon className="h-3 w-3" />
												</Button>
											</DialogClose>
										</DialogTrigger>
										<DialogContent>
											<DialogHeader>
												<DialogTitle>Invite Member</DialogTitle>
												</DialogHeader>
											<InviteUserForm />
										</DialogContent>
									</Dialog>
								</div>
								<div className="flex">
									<p className="w-36">Category :</p>
									<p>{projectDetails.category}</p>
								</div>
								<div className="flex">
									<p className="w-36">Status :</p>
									<Badge className="rounded-full">In Progress</Badge>
								</div>
							</div>
							<section>
								<p className="py-5 border-b tracking-wider">Tasks</p>
								<div className="lg:flex md:flex gap-3 justify-between py-5">
									<IssueList status="pending" title="Todo List" />
									<IssueList status="in_progress" title="In Progress" />
									<IssueList status="done" title="Done" />
								</div>
							</section>
						</div>
					</ScrollArea>
					<div className="lg:w-[30%] rounded-md sticky right-5 top-10">
						<ChatBox />
					</div>
				</div>
			) : (
				<p className="text-gray-500">Loading project details...</p>
			)}
		</div>
	);
};

export default ProjectDetails;
