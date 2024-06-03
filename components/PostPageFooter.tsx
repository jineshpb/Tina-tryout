import { FaLinkedin, FaInstagram } from "react-icons/fa"
import { FaSquareBehance } from "react-icons/fa6"
import SocialsButton from "./SocialsButton"
import Link from "next/link"
import { RiGithubFill } from "react-icons/ri"
import Bounded from "./Bounded"

export default function PostPageFooter() {
  return (
    <section className=" mt-[300px] flex w-full flex-col bg-emerald-800 ">
      <Bounded>
        <h2 className=" mt-6 text-3xl text-emerald-200">Jinesh Bhaskaran</h2>
        <div className="mb-8 mt-2 flex w-full flex-col flex-wrap items-start gap-8   text-emerald-600 *:fill-emerald-400 md:flex-row ">
          <div className="flex gap-4">
            <Link
              href="https://instagram.com/jineshpbhaskar"
              target="_blank"
              className="flex flex-row-reverse items-center justify-end  gap-2 text-emerald-600 transition-all duration-500 hover:text-emerald-300"
            >
              Instagram
              <FaInstagram size={16} />
            </Link>
            {"/"}
          </div>
          <div className="flex gap-4">
            <Link
              href="https://instagram.com/jineshpbhaskar"
              target="_blank"
              className="flex flex-row-reverse items-center  justify-end  gap-2 text-emerald-600 transition-all duration-500 hover:text-emerald-300"
            >
              Behance
              <FaSquareBehance size={16} />
            </Link>
            {"/"}
          </div>
          <Link
            href="https://instagram.com/jineshpbhaskar"
            target="_blank"
            className="flex flex-row-reverse items-center justify-end  gap-2 text-emerald-600 transition-all duration-500 hover:text-emerald-300"
          >
            LinkedIn
            <FaLinkedin size={16} />
          </Link>
        </div>
        <div className="mb-8 flex flex-col items-start text-left text-emerald-600 ">
          <p>All rights reserved. © 2024 Jinesh P bhaskaran </p>
          <span>
            Cat model from Sketchfab by <br /> Kanna-Nakajima
          </span>
        </div>
      </Bounded>
    </section>
  )
}
