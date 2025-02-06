import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotFilledIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { ProjectType } from "../ProjectList/ProjectList";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/Redux/Hook";
import { deleteProject } from "@/Redux/Project/Action";

interface ProjectCardProps {
	project: ProjectType;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const handleDelete = (projectId: number) => {
		dispatch(deleteProject(projectId));
	};

	return (
		<Card className="p-5 w-full lg:max-w-3xl">
			<div className="space-y-5">
				<div className="space-y-2">
					<div className="flex justify-between">
						<div className="flex items-center gap-5">
							<h1
								onClick={() => navigate("/project/3")}
								className="cursor-pointer text-lg font-bold"
							>
								{project.name}
							</h1>
							<DotFilledIcon />
							<p className="text-sm text-gray-400">{project.category}</p>
						</div>
						<div className="">
							<DropdownMenu>
								<DropdownMenuTrigger>
									<Button
										className="rounded-full"
										variant={"ghost"}
										size={"icon"}
									>
										<DotsVerticalIcon />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="bg-popover p-2">
									<DropdownMenuItem>Update</DropdownMenuItem>
									<DropdownMenuItem onClick={()=>handleDelete(project.id)}>
										Delete
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>

					<p className="text-gray-500 text-sm ">{project.description} </p>
				</div>
				<div className="flex flex-wrap gap-2 items-center ">
					{project.tags.map((tag) => (
						<Badge key={tag} variant={"outline"}>
							{tag}
						</Badge>
					))}
				</div>
			</div>
		</Card>
	);
};

export default ProjectCard;
