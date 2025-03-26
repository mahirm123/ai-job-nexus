
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Animate elements when they scroll into view
export const animateOnScroll = (selector: string, options = {}) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        once: true,
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      ...options,
    });
  });
};

// Animate staggered elements
export const animateStaggered = (selector: string, staggerAmount = 0.1, options = {}) => {
  const elements = document.querySelectorAll(selector);
  gsap.from(elements, {
    y: 50,
    opacity: 0,
    stagger: staggerAmount,
    duration: 0.8,
    ease: "power3.out",
    ...options,
  });
};

// Fade in animation
export const fadeIn = (element: HTMLElement | null, delay = 0, duration = 0.8) => {
  if (!element) return;
  
  gsap.from(element, {
    opacity: 0,
    y: 20,
    duration,
    delay,
    ease: "power3.out",
  });
};

// Slide in from side animation
export const slideIn = (
  element: HTMLElement | null, 
  direction: "left" | "right" = "left", 
  delay = 0, 
  duration = 0.8
) => {
  if (!element) return;
  
  const x = direction === "left" ? -50 : 50;
  
  gsap.from(element, {
    opacity: 0,
    x,
    duration,
    delay,
    ease: "power3.out",
  });
};

// Setup smooth scrolling for anchor links
export const setupSmoothScrolling = () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId as string);
      
      if (targetElement) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: targetElement,
            offsetY: 100,
          },
          ease: "power3.inOut",
        });
      }
    });
  });
};

// Animated counter for statistics
export const animateCounter = (
  element: HTMLElement | null, 
  endValue: number, 
  duration = 2,
  useScrollTrigger = true
) => {
  if (!element) return;
  
  const counter = { value: 0 };
  const animationConfig = {
    value: endValue,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      element.textContent = Math.round(counter.value).toString();
    },
  };
  
  if (useScrollTrigger) {
    const animation = gsap.to(counter, {
      ...animationConfig,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        once: true,
      }
    });
    
    return animation;
  } else {
    return gsap.to(counter, animationConfig);
  }
};
