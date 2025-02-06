import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { register } from "@/Redux/Auth/Action";
import { useAppDispatch } from "@/Redux/Hook";
import { useForm, SubmitHandler } from "react-hook-form";

interface SignUpFormValues {
    fullName: string;
    email: string;
    password: string;
}

const SignUp = () => {
    const dispatch = useAppDispatch()

    const form = useForm<SignUpFormValues>({
        defaultValues: {
            fullName: "",
            email: "",
            password: ""
        }
    });

    const handleSubmit: SubmitHandler<SignUpFormValues> = (data) => {
        dispatch(register(data));
    };

    return (
        <div className="space-y-5">
            <h1>Register</h1>
            <Form {...form}>
                <form className="space-y-3" onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField control={form.control}
                        name="fullName"
                        render={({ field }) =>
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder="Full Name" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }
                    />
                    <FormField control={form.control}
                        name="email"
                        render={({ field }) =>
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder="Email" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }
                    />
                    <FormField control={form.control}
                        name="password"
                        render={({ field }) =>
                            <FormItem>
                                <FormControl>
                                    <Input {...field} type="password" placeholder="Password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }
                    />
                    <Button type="submit">Register</Button>
                </form>
            </Form>
        </div>
    );
};

export default SignUp;