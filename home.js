console.log("connected - home - V1");

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger, SplitText)

    const matchM = gsap.matchMedia();

    let hero = document.querySelector(".hero");
    let heroVideo = hero.querySelector(".fullscreen-video");

    // PAGE LOAD
    gsap.from(".load-split", { 
        delay: 4,
        autoAlpha: 0,
        opacity: 0, 
        yPercent: 5, 
        duration: 1,
    });

    // HEADER ANIMATION
    matchM.add("(min-width: 479px)", () => {
        const heroTL = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "+=1500",
                pin: ".hero",
                scrub: "true",
            }
        });

        heroTL
        .fromTo(".load-split", { 
            opacity: 1, 
            yPercent: 0, 
        }, {
            opacity: 0, 
            yPercent: -5, 
            duration: 1,
            ease: "power2.out",
        })
        .fromTo(heroVideo, { width: "100%" }, { width: "50%", duration: 2, ease: "power1.out" })
        .from(".hero-subhead-wrapper", { opacity: 0, xPercent: 5, duration: 1, ease: "power1.in" }, "<70%");
    });

    matchM.add("(max-width: 478px)", () => {
        const heroTL = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "+=1500",
                pin: ".hero",
                scrub: "true",
            }
        });

        heroTL
        .fromTo(".load-split", { 
            opacity: 1, 
            yPercent: 0, 
        }, {
            opacity: 0, 
            yPercent: -5, 
            duration: 1,
            ease: "power2.out",
        })
        .fromTo(heroVideo, { height: "100%" }, { height: "0%", duration: 2, ease: "power1.out" })
        .from(".hero-subhead-wrapper", { opacity: 0, yPercent: 5, duration: 1, ease: "power1.in" }, "<50%");
    });

    // SUBHEADER ANIMATION
    let subTL = gsap.timeline({
        scrollTrigger: {
            trigger: ".subhero",
            start: "top top",
            end: "+=1500",
            scrub: "true",
            ease: "none",
            pin: true,
        }
    });

    subTL
    .from(".subhero-subhead-wrapper", { duration: 0.66})
    .from(".subhero-subhead-wrapper", { 
        opacity: 0, 
        yPercent: 5, 
        duration: 0.33,
    });
    
    window.addEventListener("load", () => {
        document.fonts.ready.then(() => {
            SplitText.create(".mask-split", { 
                type: "words, chars", 
                autoSplit: "true",
                onSplit: (self) => {
                    return gsap.from(self.chars, {
                        opacity: 0.3,
                        duration: 1,
                        stagger: 0.5,
                        scrollTrigger: {
                            trigger: ".subhero",
                            start: "top top",
                            end: "+=1000",
                            scrub: "true",
                            ease: "none",
                        }
                    });
                }
            });
        });
    });

    // CTA HOVER
    matchM.add("(min-width: 992px)", () => {
        const ctaText = document.querySelector(".cta-text-wrapper");
        const ctaButton = document.querySelector(".cta-button");

        ctaText.addEventListener("mouseenter", () => {
            gsap.to(".cta-text-wrapper", { width: "90%", duration: 0.5, ease: "power2.out" });
        });

        ctaButton.addEventListener("mouseenter", () => {
            gsap.to(".cta-text-wrapper", { width: "90%", duration: 0.5, ease: "power2.out" });
        });

        ctaText.addEventListener("mouseleave", () => {
            gsap.to(".cta-text-wrapper", { width: "100%", duration: 0.5, ease: "power2.out" });
        });

        ctaButton.addEventListener("mouseleave", () => {
            gsap.to(".cta-text-wrapper", { width: "100%", duration: 0.5, ease: "power2.out" });
        });
    });

    // Scroll Trigger Refresh after build
    window.addEventListener('load', () => {
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);
    });
    
    // Scroll Trigger Refresh on Resize
    window.addEventListener('resize', () => {
        // Debounce the refresh call to prevent performance issues during rapid resizing
        clearTimeout(window.refreshTimeout);
        window.refreshTimeout = setTimeout(() => {
          	ScrollTrigger.refresh();
        }, 250); // Adjust the debounce delay as needed (e.g., 250ms)
    });
});
