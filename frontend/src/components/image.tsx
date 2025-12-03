import Image from 'next/image'

interface ArticleImageProps {
  src: string
  alt: string
  width?: number
  height?: number
}

export function ArticleImage({ src, alt, width = 800, height = 400 }: ArticleImageProps) {
  return (
    <div className="my-8 flex flex-col items-center w-full">
      <div className="relative w-full max-w-full overflow-hidden rounded-lg shadow-lg border border-border/50 bg-muted/30">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-contain rounded-lg"
          style={{ maxHeight: '600px' }}
        />
      </div>
      <p className="mt-3 text-sm text-center text-muted-foreground">
        {alt}
      </p>
    </div>
  )
}