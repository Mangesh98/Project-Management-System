import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusIcon } from "@radix-ui/react-icons"
import InviteUserForm from "./InviteUserForm"

const ProjectDetails = () => {
    function handleProjectInvitaion(event: any): void {
        throw new Error("Function not implemented.")
    }

    return (
        <div className="mt-5 lg:px-10 ">
            <div className="gap-5 lg:flex justify-between pb-4">
                <ScrollArea className="h-screen lg:w-[69%] pr-2">
                    <div className="pb-10 w-full text-gray-400">
                        <h1 className="pb-5 font-semibold text-lg">Create Ecommerce website using react</h1>
                        <div className="pb-10 space-y-5  text-sm">
                            <p className="w-full md:max-w-lg lg:max-w-xl">
                                Lorem ipsum dolor sit amet.
                            </p>
                            <div className="flex">
                                <p className="w-36">Project Lead :</p>
                                <p>Mangesh</p>
                            </div>
                            <div className="flex">
                                <p className="w-36">Members :</p>
                                <div className="flex gap-2 items-center">
                                    {
                                        [1, 1, 1, 1].map((_, item) =>
                                            <Avatar key={item} className="cursor-pointer ">
                                                <AvatarFallback>M</AvatarFallback>
                                            </Avatar>
                                        )

                                    }
                                </div>
                                <Dialog>
                                    <DialogTrigger>
                                        <DialogClose>
                                            <Button className="ml-2" variant="ghost" size={"sm"} onClick={handleProjectInvitaion}>
                                                <span>invite</span>
                                                <PlusIcon className="h-3 w-3" />
                                            </Button>
                                        </DialogClose>

                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>Invite Member</DialogHeader>
                                        <InviteUserForm />
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div className="flex">
                                <p className="w-36">Category :</p>
                                <p>Full Stack</p>
                            </div>
                            <div className="flex">
                                <p className="w-36">Status :</p>
                                <Badge className="rounded-full">In Progress</Badge>
                            </div>


                        </div>
                    </div>
                </ScrollArea>
            </div>
        </div>
    )

}

export default ProjectDetails