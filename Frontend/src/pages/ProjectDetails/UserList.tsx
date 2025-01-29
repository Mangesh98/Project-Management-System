import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const UserList = () => {
    const name = "Ram"
    return (
        <div className="space-y-2">

            <div className="border rounded-md">
                <p className="py-2 px-3">{name || "Unassigne"}</p>
            </div>
            {
                [1, 2, 3, 4].map((_, index) =>
                    <div key={index} className="py-2 group hover:bg-slate-800 cursor-pointer flex items-center space-x-4 rounded-md border px-4">
                        <Avatar>
                            <AvatarFallback>
                                M
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <p className="text-sm leading-none">Mangesh Kokare</p>
                            <p className="text-sm text-muted-foreground">@mangeshkokare</p>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default UserList