import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	MagnifyingGlassIcon,
	MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import { ChangeEvent, useEffect, useState } from "react";
import ProjectCard from "../Project/ProjectCard";
import { useAppDispatch, useAppSelector } from "@/Redux/Hook";
import { fetchProjects, searchProject } from "@/Redux/Project/Action";
import { categories, tags } from "./constants";

export interface ProjectType {
	id: number;
	name: string;
	description: string;
	category: string;
	tags: string[];
	owner: Owner;
	issues: Issue[];
	team: TeamMember[];
}

interface Owner {
	id: number;
	fullName: string;
	email: string;
}

interface Issue {
	id: number;
	title: string;
	description: string;
	status: string;
}

interface TeamMember {
	id: number;
	fullName: string;
	email: string;
	projectSize: number;
}

const ProjectList = () => {
	const { project } = useAppSelector((store) => store);
	const dispatch = useAppDispatch();
	const projects: ProjectType[] = project.projects;
	const searchProjects: ProjectType[] = project.searchProjects;

	useEffect(() => {
		dispatch(fetchProjects({}));
	}, []);

	const [keyword, setKeyword] = useState<string>("");

	function handleFilterTag(tag: string): void {
		if (tag === "all") {
			dispatch(fetchProjects({}));
			return;
		}
		dispatch(fetchProjects({ tag: tag }));
	}
	function handleFilterCategory(category: string): void {
		if (category === "all") {
			dispatch(fetchProjects({}));
			return;
		}
		dispatch(fetchProjects({ category: category }));
	}
	function handleSearchChange(event: ChangeEvent<HTMLInputElement>): void {
		const search: string = event.target.value;
		setKeyword(search);
		dispatch(searchProject({ search }));
		console.log("searchProjects() : ", searchProjects);
	}

	return (
		<>
			<div className="relative px-5 lg:px-0 lg:flex gap-5 py-5 justify-center">
				<section className="filterSection ">
					<Card className="p-5 sticky top-10">
						<div className="flex justify-between lg:w-[20rem]">
							<CardTitle>Filters</CardTitle>
							<p className="text-xl tracking-wider">
								<Button variant="ghost" size="icon">
									<MixerHorizontalIcon />
								</Button>
							</p>
						</div>
						<CardContent className="mt-5">
							<ScrollArea className="space-y-7 h-[70vh]">
								<div className="">
									<h1 className="pb-3 text-gray-400 border-b">Category</h1>
									<div className="pt-5">
										<RadioGroup
											className="space-y-5 pt-5"
											defaultValue="all"
											onValueChange={(value) => handleFilterCategory(value)}
										>
											{categories.map((category) => (
												<div
													key={category.value}
													className="flex items-center gap-2"
												>
													<RadioGroupItem
														value={category.value}
														id={category.value}
													>
														{category.name}
													</RadioGroupItem>
													<Label htmlFor={category.value}>
														{category.name}
													</Label>
												</div>
											))}
										</RadioGroup>
									</div>
								</div>
								<div className="pt-9">
									<h1 className="pb-3 text-gray-400 border-b">Tags</h1>
									<div className="pt-5">
										<RadioGroup
											className="space-y-5 pt-5"
											defaultValue="all"
											onValueChange={(value) => handleFilterTag(value)}
										>
											{tags.map((tag) => (
												<div
													key={tag.value}
													className="flex items-center gap-2"
												>
													<RadioGroupItem value={tag.value} id={tag.value}>
														{tag.name}
													</RadioGroupItem>
													<Label htmlFor={tag.value}>{tag.name}</Label>
												</div>
											))}
										</RadioGroup>
									</div>
								</div>
							</ScrollArea>
						</CardContent>
					</Card>
				</section>
				<section className="projectListSection w-full lg:w-[48rem]">
					<div className="flex gap-2 items-center justify-between">
						<div className="relative p-0 w-full">
							<Input
								className="40%  px-9"
								placeholder="Search Project"
								onChange={handleSearchChange}
							/>
							<MagnifyingGlassIcon className="absolute top-3 left-4" />
						</div>
					</div>
					<div className="mt-5">
						<div className="space-y-5 min-h-[74vh]">
							{keyword
								? searchProjects.map((project) => (
										<ProjectCard key={project.id} project={project} />
								  ))
								: projects.map((project) => (
										<ProjectCard key={project.id} project={project} />
								  ))}
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default ProjectList;
