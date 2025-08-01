"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import Bounded from "./Bounded"
import { FaLock } from "react-icons/fa"
import { MdContentCopy } from "react-icons/md"
import { FaCheck } from "react-icons/fa"
import { Toaster, toast } from "react-hot-toast"
import { setAuth, checkAuth } from "@/utils/auth"

interface PasswordProtectionProps {
  password: string
  link: string
  isExternal?: boolean
  title?: string
  description?: string
  email?: string
  successMessage?: string
}

export default function PasswordProtection({
  password,
  link,
  isExternal = false,
  title = "Password Protection",
  description = "Some contents on this page are bounded by NDA. Please enter the password to access. Need password? Please contact",
  email = "jineshpb@gmail.com",
  successMessage = "Access Granted!",
}: PasswordProtectionProps) {
  const [inputPassword, setInputPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  // Check if already authenticated on component mount
  useEffect(() => {
    if (checkAuth(link)) {
      setIsAuthenticated(true)
      // If already authenticated, redirect immediately
      if (isExternal) {
        window.location.href = link
      } else {
        window.location.replace(link)
      }
    }
  }, [link, isExternal])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (inputPassword === password) {
      // Store authentication in localStorage
      setAuth(link)
      setIsAuthenticated(true)

      if (isExternal) {
        // Open external link in same tab
        window.location.href = link
      } else {
        // Navigate to internal route - replace current history entry
        window.location.replace(link)
      }
    } else {
      alert("Incorrect password")
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true)
      toast.success("Email copied to clipboard!")
      setTimeout(() => setCopied(false), 5000)
    })
  }

  if (isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">{successMessage}</h1>
          {isExternal ? (
            <>
              <p className="mb-4 text-gray-600">
                The link should have opened in a new tab. If not, click the link
                below:
              </p>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Open Link
              </a>
            </>
          ) : (
            <p className="mb-4 text-gray-600">Redirecting to the post...</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="mt-32 flex grow items-start justify-center px-6 lg:mt-44">
        <Bounded className="flex w-full max-w-lg flex-col gap-2">
          <div className="flex items-center gap-3">
            <FaLock />
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>

          <div className="">
            <p className="text-sm text-gray-500">{description} </p>
            <div className="flex items-center text-sm text-gray-500">
              <a href={`mailto:${email}`}>{email}</a>
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
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              placeholder="Enter password"
            />
            <Button type="submit">Submit</Button>
          </form>
        </Bounded>
      </div>
    </div>
  )
}
