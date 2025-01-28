import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MagnifyingGlassIcon, MixerHorizontalIcon } from "@radix-ui/react-icons"
import { ChangeEvent, useState } from "react"
import ProjectCard from "../Project/ProjectCard"

export const tags = [
    { name: "All", value: "all" },
    { name: "React", value: "react" },
    { name: "NextJs", value: "nextjs" },
    { name: "SpringBoot", value: "springboot" },
    { name: "NodeJs", value: "nodejs" },
    { name: "MySQL", value: "mysql" },
    { name: "MongoDB", value: "mongodb" },
    { name: "Angular", value: "angular" },
    { name: "Flask", value: "flask" },
    { name: "Django", value: "django" },
]

export const categories = [
    { name: "All", value: "all" },
    { name: "FullStack", value: "fullstack" },
    { name: "Frontend", value: "frontend" },
    { name: "Backend", value: "backend" },
];

const ProjectList = () => {
    const [keywrod, setKeyword] = useState<string>("");


    function handleFilterChange(category: string, value: string): void {
        console.log(category, value);

    }



    function handleSearchChange(event: ChangeEvent<HTMLInputElement>): void {
        setKeyword(event.target.value);
    }

    return (
        <>
            <div className="relative px-5 lg:px-0 lg:flex gap-5 py-5 justify-center">
                <section className="filterSection ">

                    <Card className="p-5 sticky top-10">
                        <div className="flex justify-between lg:w-[20rem]">
                            <CardTitle>Filters</CardTitle>
                            <p className="text-xl tracking-wider">
                                <Button variant="ghost" size="icon">
                                    <MixerHorizontalIcon />
                                </Button>
                            </p>
                        </div>
                        <CardContent className="mt-5">
                            <ScrollArea className="space-y-7 h-[70vh]" >
                                <div className="">
                                    <h1 className="pb-3 text-gray-400 border-b">
                                        Category
                                    </h1>
                                    <div className="pt-5">
                                        <RadioGroup className="space-y-5 pt-5" defaultValue="all" onValueChange={(value) => handleFilterChange("category", value)}>
                                            {categories.map((category) => (
                                                <div key={category.value} className="flex items-center gap-2">
                                                    <RadioGroupItem value={category.value} id={category.value}>{category.name}</RadioGroupItem>
                                                    <Label htmlFor={category.value}>{category.name}</Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>
                                </div>
                                <div className="pt-9">
                                    <h1 className="pb-3 text-gray-400 border-b">
                                        Tags
                                    </h1>
                                    <div className="pt-5">
                                        <RadioGroup className="space-y-5 pt-5" defaultValue="all" onValueChange={(value) => handleFilterChange("tag", value)}>

                                            {tags.map((tag) => (
                                                <div key={tag.value} className="flex items-center gap-2">
                                                    <RadioGroupItem value={tag.value} id={tag.value}>{tag.name}</RadioGroupItem>
                                                    <Label htmlFor={tag.value} >{tag.name}</Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>

                </section>
                <section className="projectListSection w-full lg:w-[48rem]">
                    <div className="flex gap-2 items-center justify-between">
                        <div className="relative p-0 w-full">
                            <Input className="40%  px-9" placeholder="Search Project" onChange={handleSearchChange} />
                            <MagnifyingGlassIcon className="absolute top-3 left-4" />
                        </div>

                    </div>
                    <div className="mt-5">
                        <div className="space-y-5 min-h-[74vh]">
                            {
                                keywrod ? [1, 1, 1].map((_, item) => <ProjectCard key={item} />) : [1, 1, 1, 1].map((_, item) => <ProjectCard key={item} />)
                            }
                        </div>
                    </div>
                </section>


            </div>
        </>
    )
}

export default ProjectList
