import Image from "next/image"

type AvatarProps = {
  image: any
  className?: string
}

export default function SmallAvatar({ image, className }: AvatarProps) {
  return (
    <div className={`overflow-hidden  ${className}`}>
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
