import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card'
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { DotFilledIcon, DotsVerticalIcon } from '@radix-ui/react-icons';

const ProjectCard = () => {
  return (
    <Card className="p-5 w-full lg:max-w-3xl">
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-5">
              <h1 className='cursor-pointer text-lg font-bold' >
                Create Ecommerce Project
              </h1>
              <DotFilledIcon />
              <p className='text-sm text-gray-400'>
                Fullstack
              </p>
            </div>
            <div className="">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button className='rounded-full' variant={'ghost'} size={'icon'}>
                    <DotsVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='bg-popover p-2'>
                  <DropdownMenuItem>
                    Update
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>

              </DropdownMenu>
            </div>
          </div>

          <p className='text-gray-500 text-sm '>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
        </div>
        <div className="flex flex-wrap gap-2 items-center ">
          {
            ['React', 'Node', 'Express', 'MongoDB'].map((tag) => (
              <Badge key={tag} variant={'outline'} >{tag}</Badge>
            ))
          }

        </div>
      </div>
    </Card>
  )
}

export default ProjectCard; 