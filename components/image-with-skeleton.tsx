import { useState } from "react"
import Image from "next/image"
import Skeleton from "react-loading-skeleton"

const ImageWithSkeleton = ({
  src,
  alt,
  className,
  width,
  height,
  onClick,
  normalImg = false,
}: {
  src: string
  alt?: string
  className?: string
  width: number
  height: number
  normalImg?: boolean
  onClick?: () => void
}) => {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div
          className="absolute inset-0 animate-pulse rounded-md bg-muted"
          style={{ zIndex: 1 }}
        >
          <Skeleton height="100%" />
        </div>
      )}
      {normalImg ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`rounded-md ${isLoading ? "invisible" : ""}`}
          onLoad={handleLoad}
          onClick={onClick}
        />
      ) : (
        <Image
          src={src}
          alt={alt || ""}
          width={width}
          height={height}
          className={`rounded-md ${isLoading ? "invisible" : ""}`}
          onLoad={handleLoad}
          onClick={onClick}
        />
      )}
    </div>
  )
}

export default ImageWithSkeleton
