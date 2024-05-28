import Image from "next/image"

type AvatarProps = {
  image: any
  className?: string
}

export default function SmallAvatar({ image, className }: AvatarProps) {
  return (
    <div
      className={`relative size-[200px] overflow-hidden rounded-[44px] md:size-[128px] ${className}`}
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
