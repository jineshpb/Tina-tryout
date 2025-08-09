"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  FaArrowRight,
  FaDownload,
  FaEnvelope,
  FaLinkedin,
} from "react-icons/fa"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function JobApplicationPage() {
  const [showRedirect, setShowRedirect] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRedirect(true)
    }, 3000) // Show redirect button after 3 seconds

    return () => clearTimeout(timer)
  }, [])

  const handleRedirect = () => {
    window.location.href = "https://jineshb.me"
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-4xl bg-gradient-to-br">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12 mt-32 flex flex-col items-start justify-start">
          <div className="mb-4">
            <Image
              src="/profile.jpg"
              alt="Jinesh P Bhaskaran"
              width={100}
              height={100}
              className={`rounded-full bg-red-500 object-cover ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              priority
              unoptimized
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </div>
          <h1 className="mb-4 text-4xl font-bold  md:text-6xl">
            Jinesh P Bhaskaran
          </h1>
          <p className="text-xl text-emerald-600 dark:text-emerald-300">
            Product Designer
          </p>
        </div>

        {/* Cover Letter */}
        <div className="mx-auto mb-8  ">
          <h2 className="mb-6 text-3xl font-bold  dark:text-white">
            Cover Letter
          </h2>

          <div className="prose prose-xl max-w-none dark:prose-invert">
            <p className="mb-6 ">Dear Hiring Manager,</p>

            <p className="mb-6 ">
              I am writing to express my strong interest in the Product Designer
              position at your company. With over 5 years of experience in
              product design and development, I bring a unique blend of creative
              design thinking and technical implementation skills.
            </p>

            <p className="mb-6 ">
              My expertise spans across user experience design, visual design,
              and front-end development, allowing me to create seamless,
              user-centered solutions from concept to implementation. I have
              successfully delivered projects for clients ranging from startups
              to enterprise companies, always focusing on creating intuitive and
              engaging user experiences.
            </p>

            <p className="mb-6 ">
              I am particularly drawn to your company&apos;s mission of
              [specific company mission/values] and believe my skills in
              [specific skills relevant to the role] would be valuable to your
              team. I am excited about the opportunity to contribute to
              innovative projects and grow alongside talented professionals.
            </p>

            <p className="mb-6 ">
              I would welcome the opportunity to discuss how my background,
              skills, and enthusiasm would make me a valuable addition to your
              team. Thank you for considering my application.
            </p>

            <p className="">
              Best regards,
              <br />
              Jinesh P Bhaskaran
            </p>
          </div>
        </div>

        {/* Contact & Actions */}
        <div className="mx-auto mt-32 max-w-4xl ">
          <div className="grid gap-8 md:grid-rows-2">
            {/* Actions */}
            <div className="flex flex-col items-start justify-start">
              <h3 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
                Next Steps
              </h3>
              <div className="flex flex-col items-center justify-center gap-2">
                <Button
                  onClick={handleRedirect}
                  variant="default"
                  className="gap-2"
                >
                  <FaArrowRight />
                  View Full Portfolio
                </Button>

                <Button
                  onClick={() => {
                    window.open("/resume.pdf", "_blank")
                  }}
                  className="gap-2"
                  variant="outline"
                >
                  <FaDownload />
                  Download Resume
                </Button>
              </div>
            </div>
            {/* Contact Info */}
            <div>
              <h3 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
                Get in Touch
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-emerald-600 dark:text-emerald-400" />
                  <a
                    href="mailto:jineshpb@gmail.com"
                    className="text-emerald-600 hover:underline dark:text-emerald-400"
                  >
                    jineshpb@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <FaLinkedin className="text-emerald-600 dark:text-emerald-400" />
                  <a
                    href="https://linkedin.com/in/jineshpb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:underline dark:text-emerald-400"
                  >
                    linkedin.com/in/jineshpb
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
