import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button"

export const LinkCard = ({
  link,
  title,
  description,
}: {
  link: string
  title: string
  description: string
}) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardFooter>
          <Button>
            <Link href={link}>View project</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}
