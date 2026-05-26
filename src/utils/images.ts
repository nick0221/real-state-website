/**
 * Unsplash image URL optimization utilities.
 *
 * Takes a standard Unsplash URL like:
 *   https://images.unsplash.com/photo-XXXXX?w=800&q=80
 * and produces optimized variants with WebP format hints and srcset values.
 */

export interface OptimizedImage {
  src: string;
  srcSet: string;
  webpSrc: string;
  webpSrcSet: string;
}

/**
 * Build an optimized image config from an Unsplash URL.
 * Returns `src`, `srcSet`, and WebP equivalents for responsive images.
 */
export function optimizeUnsplash(url: string): OptimizedImage {
  // Strip any existing query params to rebuild cleanly
  const base = url.split("?")[0];

  // Unsplash auto-format serves WebP when &fm=webp is added
  const widths = [400, 800, 1200];
  const srcSet = widths.map((w) => `${base}?w=${w}&q=80 ${w}w`).join(", ");
  const webpSrcSet = widths
    .map((w) => `${base}?w=${w}&q=80&fm=webp ${w}w`)
    .join(", ");

  return {
    src: `${base}?w=800&q=80`,
    srcSet,
    webpSrc: `${base}?w=800&q=80&fm=webp`,
    webpSrcSet,
  };
}

/**
 * Props for a responsive <img> element with WebP <picture> support.
 */
export interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Set "high" for LCP images (hero), "lazy" for below-fold images */
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  decoding?: "async" | "sync" | "auto";
}

/**
 * Builds className and style props for an optimized responsive image.
 * For maximum performance, render a <picture> element with <source> for WebP
 * and fallback <img>. See the `OptimizedImage` component below.
 */
export function imageProps(
  url: string,
  alt: string,
  opts?: { loading?: "lazy" | "eager"; fetchPriority?: "high" | "low" | "auto" }
): { opt: OptimizedImage; imgProps: ImageProps } {
  const opt = optimizeUnsplash(url);
  return {
    opt,
    imgProps: {
      src: opt.src,
      alt,
      loading: opts?.loading ?? "lazy",
      fetchPriority: opts?.fetchPriority ?? "auto",
    },
  };
}
