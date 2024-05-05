import Image from "next/image"

type AvatarProps = {
  image: any
  className?: string
}

export default function SmallAvatar({ image, className }: AvatarProps) {
  return (
    <div
      className={`relative size-[128px] overflow-hidden rounded-[44px] border-4 border-emerald-300 ${className}`}
    >
      <Image
        src={image}
        layout="fill"
        className=""
        alt="avatar"
        objectFit="cover"
      />
    </div>
  )
}
