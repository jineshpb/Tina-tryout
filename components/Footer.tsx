import Link from "next/link"

export default function Footer() {
  return (
    <div className="py-10 text-center text-sm">
      <hr />
      <p>
        A{" "}
        <Link
          href="https://jineshb.me"
          target="_blank"
          className="underline-offset-2 hover:text-emerald-500 hover:underline"
        >
          Jinesh
        </Link>{" "}
        Template
      </p>
    </div>
  )
}
