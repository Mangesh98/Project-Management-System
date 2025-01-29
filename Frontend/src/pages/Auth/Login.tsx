import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'

const Login = () => {
     const form = useForm({
        // resolver:
        defaultValues: {
            email: "",
            password: ""
        }
    })

    function handleSubmit(data: any): void {
        console.log(data)
    }
    return (
        <div className="space-y-5">
            <h1>Login</h1>
            <Form {...form}>
                <form className="space-y-3" onSubmit={form.handleSubmit(handleSubmit)}>
                    
                    <FormField control={form.control}
                        name="email"
                        render={({ field }) =>
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder="Email"
                                        type="email" className="border w-full border-gray-700 p-5"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>}
                    />
                    <FormField control={form.control}
                        name="password"
                        render={({ field }) =>
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder="Password "
                                        type="password" className="border w-full border-gray-700 p-5"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>}
                    />
                    <Button type="submit" className="w-full mt-5">Login</Button>
                </form>
            </Form>
        </div>
    )
}

export default Login