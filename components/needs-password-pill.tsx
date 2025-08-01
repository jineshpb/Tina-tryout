import React from "react"
import { FaLock } from "react-icons/fa6"

const NeedsPasswordPill = () => {
  return (
    <div className="flex items-center rounded-xl  border border-zinc-100 px-2 py-1 text-sm text-gray-400 shadow-sm dark:border-zinc-800">
      <FaLock className="mr-2 text-gray-400" />
      <p>needs password</p>
    </div>
  )
}

export default NeedsPasswordPill
