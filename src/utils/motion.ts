// Tree-shakeable motion wrapper
// Imports only the HTML/SVG elements used across the codebase from framer-motion/m
// (each is a separate export → unused element types are tree-shaken by the bundler)
// Hooks and AnimatePresence are imported as named exports from the main package.

import {
  div,
  h1,
  p,
  button,
  nav,
  a,
  span,
  form,
  tr,
  svg,
} from "framer-motion/m";

import {
  AnimatePresence as _AnimatePresence,
  useScroll as _useScroll,
  useTransform as _useTransform,
  useMotionValue as _useMotionValue,
  useSpring as _useSpring,
} from "framer-motion";

// Proxy with only the elements we actually use — unused elements stay out of the bundle
export const m = { div, h1, p, button, nav, a, span, form, tr, svg };

export const AnimatePresence = _AnimatePresence;
export const useScroll = _useScroll;
export const useTransform = _useTransform;
export const useMotionValue = _useMotionValue;
export const useSpring = _useSpring;
