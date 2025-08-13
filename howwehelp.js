console.log("connected - how we help - v2.5");

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger, SplitText)

    const matchM = gsap.matchMedia();

    // PAGE LOAD
    let loadTL = gsap.timeline();
    loadTL.set(".hero-subhead-wrapper", { visibility: "visible" })
          .to(".hero-subhead-wrapper", { opacity: 1, duration: 1 })
          .from(".hero-subhead-wrapper", { yPercent: 5, duration: 1 }, "<");

    // HEADER ANIMATION
    matchM.add("(min-width: 479px)", () => {
        const heroTL = gsap.timeline({
            scrollTrigger: {
                trigger: ".help-hero",
                start: "top top",
                end: "+=1500",
                pin: ".help-hero",
                scrub: "true",
            }
        });

        heroTL
        .fromTo(".hero-subhead-wrapper", { opacity: 1, xPercent: 0 }, { opacity: 0, xPercent: 5, duration: 1, ease: "power1.out"})
        .fromTo(".fullscreen-video", { width: "50%" }, { width: "100%", duration: 2, ease: "power1.in" }, "<70%");
    });

    matchM.add("(max-width: 478px)", () => {
        const heroTL = gsap.timeline({
            scrollTrigger: {
                trigger: ".help-hero",
                start: "top top",
                end: "+=1500",
                pin: ".help-hero",
                scrub: "true",
            }
        });

        heroTL
        .fromTo(".hero-subhead-wrapper", { opacity: 1, yPercent: 0 }, { opacity: 0, yPercent: -5, duration: 1, ease: "power1.out"})
        .fromTo(".fullscreen-video", { height: "40%" }, { height: "100%", duration: 2, ease: "power1.in" }, "<50%");
    });

    // CATEGORIES ANIMATION
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".categories",
            start: "top 40%",
            end: "bottom bottom",
            scrub: true,
        },
    });

    gsap.utils.toArray(".category-item").forEach((el) => {
        let width = el.getBoundingClientRect().width;

        gsap.set(el, { width: "100%" });

        tl.to(el, {
            width: `${width}px`,
            ease: "power1.inOut",
            duration: 1.5,
        }, "<70%");
    });


    // RECOGNITION ANIMATION
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
                            trigger: ".recognition",
                            start: "top top",
                            end: "+=1000",
                            pin: ".recognition",
                            scrub: "true",
                            ease: "none",
                        }
                    });                
                }
            });
        });
    });

    // COMMITTMENT ANIMATION
    let commTL = gsap.timeline({
        scrollTrigger: {
            trigger: ".commitment",
            start: "top top",
            end: "+=2000",
            scrub: true,
            pin: ".commitment",
        }
    });

    gsap.utils.toArray(".comm-num").forEach((el, i) => {
        if ( i < 2 ) {
            commTL
            .fromTo(el, { opacity: 0.3 }, { opacity: 1, duration: 0.5 }, i)
            .fromTo(el, { opacity: 1 }, { opacity: 0.3, delay: 0.3, duration: 0.2 }, "<0.5");
        } else {
            commTL
            .fromTo(el, { opacity: 0.3 }, { opacity: 1, duration: 0.5 }, i)
        }
    });

    gsap.utils.toArray(".commitment-slider-item").forEach((el, i) => {
        if ( i < 2 ) {
            commTL
            .fromTo(el, { opacity: 0, yPercent: 5 }, { opacity: 1, yPercent: 0, duration: 0.5 }, i)
            .fromTo(el, { opacity: 1, yPercent: 0 }, { opacity: 0, yPercent: -5, delay: 0.3, duration: 0.2 }, "<0.5");
        } else {
            commTL
            .fromTo(el, { opacity: 0, yPercent: 5 }, { opacity: 1, yPercent: 0, duration: 0.5 }, i)
        }
    });
    
    // Scroll Trigger Refresh after build
    window.addEventListener('load', () => {
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
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
