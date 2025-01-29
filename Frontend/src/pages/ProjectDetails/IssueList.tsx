import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import IssueCard from "./IssueCard"
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import CreateIssueForm from "./CreateIssueForm";

interface IssueListProps {
    title: string;
    status: string;
}

const IssueList = ({ title, status }: IssueListProps) => {
    return (
        <div>
            <Dialog>
                <Card className="w-full md:w-[300px] lg:w-[310px]">
                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-2">
                        <div className="space-y-2">
                            {
                                [1, 2, 3].map((_, index) =>
                                    <IssueCard key={index} />
                                )
                            }
                        </div>
                    </CardContent>
                    <CardFooter>
                        <DialogTrigger>
                            <Button className="w-full flex items-center gap-2" variant="outline" >
                                <PlusIcon className="w-5 h-5" />
                                Create Issue</Button>
                        </DialogTrigger>

                    </CardFooter>
                </Card>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Issue</DialogTitle>
                    </DialogHeader>
                    <CreateIssueForm />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default IssueList