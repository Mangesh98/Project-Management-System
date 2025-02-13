import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CommentDataType, createComment } from "@/Redux/Comment/Action"
import { useAppDispatch } from "@/Redux/Hook"
import { useForm } from "react-hook-form"
interface CreateCommentFormProps {
    issueId: number
}
const CreateCommentForm = ({ issueId }: CreateCommentFormProps) => {
    const dispatch = useAppDispatch()
    const form = useForm<CommentDataType>({
        defaultValues: {
            issueId: issueId,
            content: ""
        }
    })

    function handleSubmit(data: any): void {
        dispatch(createComment(data));
    }
    return (
        <div>
            <Form {...form}>
                <form className="flex gap-2" onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField control={form.control}
                        name="content"
                        render={({ field }) =>
                            <FormItem>
                                <div className="flex gap-2">

                                    <div className="">
                                        <Avatar>
                                            <AvatarFallback>
                                                M
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <FormControl>
                                        <Input {...field} placeholder="Member Email"
                                            type="text"
                                            className="w-[20rem]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        }
                    />

                    <Button type="submit" >Save</Button>

                </form>
            </Form>
        </div>
    )
}

export default CreateCommentForm