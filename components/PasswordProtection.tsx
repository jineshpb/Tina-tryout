"use client"

import { useState } from "react"
import { PostsQuery } from "@/tina/__generated__/types"
import { PostPageComponent } from "@/components/app/posts/post-page-component"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import Bounded from "./Bounded"
import RenderModel from "./RenderModel"
import { ChonkyCat } from "./models/ChonkyCat"
import { FaLock } from "react-icons/fa"
import { MdContentCopy, MdOutlineAlternateEmail } from "react-icons/md"
import { FaCheck } from "react-icons/fa"
import { Toaster, toast } from "react-hot-toast"
import Lottie from "react-lottie"

export default function PasswordProtection({
  data,
  variables,
  query,
}: {
  data: PostsQuery
  variables: {
    relativePath: string
  }
  query: string
}) {
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log(data.posts?.password)

    const storedPassword = data.posts?.password
    if (password === storedPassword) {
      setIsAuthenticated(true)
    } else {
      alert("Incorrect password")
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText("hello@khoirul.dev").then(() => {
      setCopied(true)
      toast.success("Email copied to clipboard!")
      setTimeout(() => setCopied(false), 5000)
    })
  }

  if (isAuthenticated) {
    return <PostPageComponent data={data} variables={variables} query={query} />
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="mt-44 flex grow items-start justify-center">
        <Bounded className="flex w-full max-w-lg flex-col gap-2">
          <div className="flex items-center gap-3">
            <FaLock />
            <h1 className="text-2xl font-bold">Password Protection</h1>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Some contents on this page are bounded by NDA. Please enter the
              password to access. Need password? Please contact{" "}
            </p>
            <div className="flex items-center   text-sm text-gray-500">
              <a href="mailto:jineshpb@gmail.com">jineshpb@gmail.com</a>
              <Button
                variant="link"
                className="px-3 py-0 text-gray-500"
                onClick={handleCopy}
              >
                {!copied ? <MdContentCopy /> : <FaCheck />}

                <Toaster />
              </Button>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 lg:flex-row"
          >
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            <Button type="submit">Submit</Button>
          </form>
        </Bounded>
      </div>
      <div className="-mb-20 h-[300px] w-full">
        <RenderModel className="h-full">
          <ChonkyCat />
        </RenderModel>
      </div>
    </div>
  )
}
