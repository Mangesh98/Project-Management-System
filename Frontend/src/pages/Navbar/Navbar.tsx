import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import CreateProjectForm from "../Project/CreateProjectForm"
import { PersonIcon } from "@radix-ui/react-icons"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/Redux/Hook";
import { logout } from "@/Redux/Auth/Action";

const Navbar = () => {
    const navigate = useNavigate()
    const dispatch=useAppDispatch()
    const {auth} = useAppSelector(store=>store);
    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <div className="border-b py-4 flex items-center justify-between mx-4">
            <div className="flex items-center gap-3 ">
                <p onClick={()=>navigate("/")} className="cursor-pointer">
                    Project Management
                </p>
                <Dialog>
                    <DialogTrigger>
                        <Button variant="ghost">
                            New Project
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Project</DialogTitle>
                            <DialogDescription>You can create new project here</DialogDescription>
                            </DialogHeader>
                        <CreateProjectForm />
                    </DialogContent>
                </Dialog>
                <Button onClick={()=>navigate("/upgrade_plan")} variant="ghost">Upgrade</Button>
            </div>
            <div className="flex gap-3 items-center ">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="outline" size={"icon"} className="rounded-full border-2 border-gray-500">
                            <PersonIcon/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={handleLogout}>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <p>{auth.user.fullName || "User"}</p>
            </div>

        </div>
    )
}

export default Navbar