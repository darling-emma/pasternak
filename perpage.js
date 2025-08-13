console.log("connected - per page - v2");

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

    // Initialize ScrollSmoother
    ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1,
        ignoreMobileResize: true,
        normalizeScroll: true
    });

    // Defining freeze scroll function
    function freezeScroll() {
        if (ScrollSmoother.get() && !ScrollTrigger.isTouch) {
            ScrollSmoother.get().paused(true);
            document.querySelector(".smooth-wrapper").style.pointerEvents = "none";
        } else {
            document.body.style.overflow = "hidden";
            document.body.style.touchAction = "none";
        }
    }

    // Defining resume scroll function
    function resumeScroll() {
        if (ScrollSmoother.get() && !ScrollTrigger.isTouch) {
            ScrollSmoother.get().paused(false);
            document.querySelector(".smooth-wrapper").style.pointerEvents = "auto";
        } else {
            document.body.style.overflow = "";
            document.body.style.touchAction = "";
        }
    }

    // Nav color animation
    gsap.utils.toArray(".nav-light2dark").forEach((trigger) => {
        gsap.to("html", {
            scrollTrigger: {
                trigger: trigger,
                start: "top 5%",
                end: "top top",
                scrub: true,
            },
            "--_colors---colors--nav-color": "#07291D",
        });
    });

    gsap.utils.toArray(".nav-dark2light").forEach((trigger) => {
        gsap.to("html", {
            scrollTrigger: {
                trigger: trigger,
                start: "top 5%",
                end: "top top",
                scrub: true,
            },
            "--_colors---colors--nav-color": "#F9F7F0",
        });
    });

    let navTrigger = document.querySelector(".nav-lottie");
    let colorTarget = document.documentElement;
    let lastColor = getComputedStyle(colorTarget).getPropertyValue("--_colors---colors--nav-color").trim();

    const observer = new MutationObserver(() => {
        let newColor = getComputedStyle(colorTarget).getPropertyValue("--_colors---colors--nav-color").trim();
        if (newColor !== lastColor) {
            lastColor = newColor;
            console.log("color variable changed to", lastColor);
        }
    });

    observer.observe(colorTarget, { attributes: true, attributeFilter: ["style"] });

    let toggled = false;
    let savedColor = lastColor;

    navTrigger.addEventListener("click", () => {
        let currentColor = getComputedStyle(colorTarget).getPropertyValue("--_colors---colors--nav-color").trim();

        if (!toggled) {
            savedColor = currentColor;
            gsap.to(colorTarget, { "--_colors---colors--nav-color": "#F9F7F0" });
            freezeScroll();
        } else {
            gsap.to(colorTarget, { "--_colors---colors--nav-color": savedColor });
            resumeScroll();
        }
        toggled = !toggled;
    });
});
