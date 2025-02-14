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
import { useForm } from "react-hook-form";

interface InviteUserFormData {
	email: string;
}

const InviteUserForm = () => {
	const form = useForm<InviteUserFormData>({
		// resolver:
		defaultValues: {
			email: "",
		},
	});

	function handleSubmit(data: InviteUserFormData): void {
		console.log(data);
	}
	return (
		<Form {...form}>
			<form className="space-y-3" onSubmit={form.handleSubmit(handleSubmit)}>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									placeholder="Member Email"
									type="email"
									className="border w-full border-gray-700 p-5"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<DialogClose>
					<Button type="submit" className="w-full mt-5">
						Invite Member
					</Button>
				</DialogClose>
			</form>
		</Form>
	);
};

export default InviteUserForm;
