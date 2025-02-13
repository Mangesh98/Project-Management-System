import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/Redux/Hook";
import { createIssue, IssueType } from "@/Redux/Issue/Action";
import { useForm } from "react-hook-form";

interface IssueFormData {
	title: string;
	description: string;
}
interface CreateIssueFormProps {
	projectId: number;
	status: string;
}
const CreateIssueForm = ({ projectId, status }: CreateIssueFormProps) => {
	const dispatch = useAppDispatch();

	const form = useForm<IssueFormData>({
		defaultValues: {
			title: "",
			description: "",
		},
	});

	function handleSubmit(data: IssueFormData): void {
		console.log(data);
		const issue: IssueType = {
			title: data.title,
			description: data.description,
			projectId: projectId,
			status: status,
			dueDate: new Date(),
			priority: "low",
		};
		console.log("issue Data : ", issue);
		dispatch(createIssue(issue));
	}

	return (
		<div>
			<Form {...form}>
				<form className="space-y-3" onSubmit={form.handleSubmit(handleSubmit)}>
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										{...field}
										placeholder="Issue Name"
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
										placeholder="Write a description"
										type="text"
										className="border w-full border-gray-700 p-5"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<DialogClose>
						<Button type="submit" className="w-full mt-5">
							Create Issue
						</Button>
					</DialogClose>
				</form>
			</Form>
		</div>
	);
};

export default CreateIssueForm;
