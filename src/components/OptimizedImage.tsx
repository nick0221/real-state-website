import { memo } from "react";
import { optimizeUnsplash } from "../utils/images";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Set "high" for LCP images (hero), "lazy" (default) for below-fold */
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  decoding?: "async" | "sync" | "auto";
  /** Additional container props for the <picture> element */
  pictureClassName?: string;
}

/**
 * Optimized responsive image component.
 *
 * - Renders a <picture> element with a WebP <source> and jpeg fallback.
 * - Uses srcSet with 400w, 800w, 1200w breakpoints.
 * - Respects loading and fetchPriority hints for LCP/lazy control.
 */
function OptimizedImage({
  src,
  alt,
  className,
  loading = "lazy",
  fetchPriority = "auto",
  decoding = "async",
  pictureClassName,
}: OptimizedImageProps) {
  const opt = optimizeUnsplash(src);

  return (
    <picture className={pictureClassName}>
      <source srcSet={opt.webpSrcSet} type="image/webp" />
      <source srcSet={opt.srcSet} type="image/jpeg" />
      <img
        src={opt.src}
        alt={alt}
        className={className}
        loading={loading}
        fetchpriority={fetchPriority}
        decoding={decoding}
        onError={(e) => {
          // Fallback to original URL if optimized version fails
          const target = e.currentTarget;
          if (target.src !== src) {
            target.src = src;
          }
        }}
      />
    </picture>
  );
}

export default memo(OptimizedImage);
