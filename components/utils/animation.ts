import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"

gsap.registerPlugin(ScrollTrigger)

export const animateWithGsap = (
  target: HTMLElement,
  animationProps: gsap.TweenVars,
  scrollProps: gsap.plugins.ScrollTriggerInstanceVars,
) => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: "restart reverse restart reverse",
      start: "top 85%",
      ...scrollProps,
    },
  })
}

export const animateWithGsapTimeline = (
  timeline: gsap.core.Timeline,
  rotationRef: gsap.core.TweenTarget,
  rotationState: number,
  firstTarget: HTMLElement,
  secondTarget: HTMLElement,
  animationProps: gsap.TweenVars,
) => {
  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: "power2.inOut",
  })

  timeline.to(
    firstTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<",
  )
  timeline.to(
    secondTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<",
  )
}
