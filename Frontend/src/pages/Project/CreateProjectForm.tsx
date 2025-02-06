import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";

import { Cross1Icon } from "@radix-ui/react-icons";
import { DialogClose } from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/Redux/Hook";
import { createProject } from "@/Redux/Project/Action";
import { tags } from "../ProjectList/constants";

export interface CreateProjectForm {
	name: string;
	description: string;
	tags: string[];
	category: string;
}

const CreateProjectForm = () => {
	const dispatch = useAppDispatch();
	const { auth } = useAppSelector((state) => state);
	const form = useForm<CreateProjectForm>({
		// resolver:    
		defaultValues: {
			name: "",
			description: "",
			tags: [],
			category: "",
		},
	});

	function handleSubmit(data: CreateProjectForm): void {
		dispatch(createProject(data));
	}

	function handleTagsChange(item: string): void {
		const tags = form.getValues("tags");
		const updatedTags = tags.includes(item)
			? tags.filter((tag) => tag !== item)
			: [...tags, item];
		form.setValue("tags", updatedTags);
	}

	return (
		<Form {...form}>
			<form className="space-y-3" onSubmit={form.handleSubmit(handleSubmit)}>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									placeholder="Project Name"
									type="text"
									className="border w-full border-gray-700 p-5"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									placeholder="Project Description"
									type="text"
									className="border w-full border-gray-700 p-5"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="category"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Select
									{...field}
									value={field.value}
									onValueChange={(value) => field.onChange(value)}
									defaultValue="fullstack"
								>
									<SelectTrigger>
										<SelectValue placeholder="Category" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="fullstack">Full Stack</SelectItem>
										<SelectItem value="frontend">frontend</SelectItem>
										<SelectItem value="backend">backend</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="tags"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Select onValueChange={handleTagsChange}>
									<SelectTrigger className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
										<SelectValue placeholder="Tag" />
									</SelectTrigger>
									<SelectContent>
										{tags.map((tag) => (
											<SelectItem key={tag.value} value={tag.value}>
												{tag.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<div className="flex gap-1 flex-wrap ">
								{field.value.map((item) => (
									<div
										key={item}
										onClick={() => handleTagsChange(item)}
										className="cursor-pointer flex rounded-full items-center border gap-2 px-4 py-1"
									>
										<span className="text-sm">{item}</span>
										<Cross1Icon className="h-3 w-3" />
									</div>
								))}
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>

				<DialogClose>
					{auth.projectSize >= 3 ? (
						<div>
							<p>
								You can create only 3 project with free plan, please upgrade
								your plan
							</p>
						</div>
					) : (
						<Button type="submit" className="w-full mt-5">
							Create Project
						</Button>
					)}
				</DialogClose>
			</form>
		</Form>
	);
};

export default CreateProjectForm;
