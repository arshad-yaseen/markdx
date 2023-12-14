import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowTopRightIcon } from "@radix-ui/react-icons"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

const ImageWithSkeleton = ({
  image,
  onClick,
  className,
}: {
  image: any
  className?: string
  onClick?: () => void
}) => {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className={cn("group relative", className)}>
      {isLoading && (
        <div
          className="absolute inset-0 animate-pulse rounded-md bg-gray-200"
          style={{ zIndex: 1 }}
        />
      )}
      <Image
        src={image.urls.regular}
        alt={image.alt_description!}
        width={image.width}
        height={image.height}
        className={`rounded-md ${isLoading ? "invisible" : ""}`}
        onLoad={handleLoad}
        onClick={onClick}
      />
      <div className="absolute left-0 top-0 flex w-full items-center  p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <Link
          href={`${image.user.links.html}?utm_source=${siteConfig.short_name}&utm_medium=referral`}
          target="_blank"
          rel="noopener noreferrer"
          className="z-20 rounded-full  bg-foreground/50 px-2 py-1 text-xs text-background transition-all duration-200"
        >
          By <span className="hover:underline">{image.user.name}</span>{" "}
          <ArrowTopRightIcon className="inline-block h-3 w-3 group-hover:translate-y-[-1px] delay-300 transition-transform duration-200" />
        </Link>
      </div>
    </div>
  )
}

export default ImageWithSkeleton
