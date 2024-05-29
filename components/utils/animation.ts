import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"

gsap.registerPlugin(ScrollTrigger)

export const animateWithGsap = (
  target: string | HTMLElement,
  animationProps: gsap.TweenVars,
  scrollProps?: gsap.plugins.ScrollTriggerInstanceVars,
) => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,

      start: "top 85%",
      ...scrollProps,
      // markers: true,
    },
  })
}

export const animateWithGsapTimeline = (
  timeline: gsap.core.Timeline,
  rotationRef: any,
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
