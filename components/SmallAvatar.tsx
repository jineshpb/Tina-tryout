import Image from "next/image"

type AvatarProps = {
  image: any
  className?: string
}

export default function SmallAvatar({ image, className }: AvatarProps) {
  return (
    <div
      className={`relative overflow-hidden text-clip rounded-[32px]  md:h-[60px] md:w-[120px] lg:h-[100px] lg:w-[160px]`}
    >
      <Image src={image} fill className="object-cover" alt="avatar" />
    </div>
  )
}
