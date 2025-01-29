import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"

const CreateIssueForm = () => {
  const form = useForm({
    // resolver:
    defaultValues: {
      issueName: "",
      description: "",
    }
  })

  function handleSubmit(data: any): void {
    console.log(data)
  }

  return (
    <div>
  <Form {...form}>
            <form className="space-y-3" onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField control={form.control}
                    name="issueName"
                    render={({ field }) => 
                    <FormItem>
                        <FormControl>
                            <Input {...field} placeholder="Issue Name"
                                type="text" className="border w-full border-gray-700 p-5"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>}
                />
                 <FormField control={form.control}
                    name="description"
                    render={({ field }) => 
                    <FormItem>
                        <FormControl>
                            <Input {...field} placeholder="Write a description"
                                type="text" className="border w-full border-gray-700 p-5"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>}
                />
              
                <DialogClose>
                   <Button type="submit" className="w-full mt-5">Create Issue</Button>
                </DialogClose>

            </form>
        </Form>
 
    </div>
  )
}

export default CreateIssueForm