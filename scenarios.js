console.log("connected - scenarios - v1");

document.addEventListener("DOMContentLoaded", (event) => {
    // Initialize ScrollSmoother, Desktop only
    const isTouchDevice = ScrollTrigger.isTouch; // true for touch devices

    ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: isTouchDevice ? 0 : 1,
        effects: !isTouchDevice,
        ignoreMobileResize: true,
        normalizeScroll: true
    });
    
    let activeItem = null;

    gsap.utils.toArray(".scenario-item").forEach((item) => {
        
        const matchM = gsap.matchMedia();
        
        let width, targetHeight, previewHeight;

        function calculateSizes() {
            // Set width of reveal wrapper
            width = item.querySelector(".preview").getBoundingClientRect().width;
            item.querySelector(".scenario-para-group").style.width = `${width}px`;
            item.querySelector(".scenario-reveal-wrapper").style.width = `${width}px`;

            // Get target height of reveal wrapper
            targetHeight = item.querySelector(".scenario-para-group").getBoundingClientRect().height;

            // Get original height of preview
            previewHeight = item.querySelector(".preview").getBoundingClientRect().height;
        }

        calculateSizes();
        
        matchM.add("(min-width: 479px)", () => {
        		if (activeItem = null) {
                window.addEventListener("resize", calculateSizes);
            } else {
                window.onresize = function(){ location.reload(); };
            }
        });
        
        // Select only that item's wrapper + button
        const wrapper = item.querySelector(".scenario-reveal-wrapper");
        const button = item.querySelector(".scenario-button");
        const preview = item.querySelector(".preview");

        function closeItem() {
            let closeTL = gsap.timeline();
            closeTL
            .to(wrapper, { height: 0, opacity: 0, duration: 0.5, ease: "power1.out" })
            .to(button, { rotation: 0, duration: 0.5, ease: "power1.out" }, "<")
            .to(preview, { height: `${previewHeight}px`, duration: 0.5, ease: "power1.out" }, "<")
            .to(preview, { opacity: 1, duration: 0.3, ease: "power1.in" }, "<70%");
        }

        function openItem() {
            let openTL = gsap.timeline();
            openTL
            .to(preview, { opacity: 0, duration: 0.3, ease: "power1.in" })
            .to(wrapper, { height: `${targetHeight}px`, opacity: 1, duration: 0.5, ease: "power1.out"})
            .to(preview, { height: 0, duration: 0.5, ease: "power1.out" }, "<")
            .to(button, { rotation: 45, duration: 0.5, ease: "power1.out" }, "<");
        }

        item.addEventListener("click", () => {
            if (activeItem === item) {
                closeItem();
                activeItem = null;
            } else {
                if (activeItem) {
                    const prevWrapper = activeItem.querySelector(".scenario-reveal-wrapper");
                    const prevButton = activeItem.querySelector(".scenario-button");
                    const prevPreview = activeItem.querySelector(".preview");
                    let closeTL = gsap.timeline();
                    closeTL
                    .to(prevWrapper, { y: 0, height: 0, opacity: 0, duration: 0.5, ease: "power1.out" })
                    .to(prevButton, { rotation: 0, duration: 0.5, ease: "power1.out" }, "<")
                    .to(prevPreview, { height: `${previewHeight}px`, duration: 0.5, ease: "power1.out" }, "<")
                    .to(prevPreview, { opacity: 1, duration: 0.3, ease: "power1.in" },"<70%");
                }
                openItem();
                activeItem = item;
            }
        }); 
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
    let navScrollTrigger = document.querySelector(".nav-light2dark");

    gsap.to("html", {
        scrollTrigger: {
            trigger: navScrollTrigger,
            start: "top 5%",
            end: "top top",
            scrub: true,
        },
        "--_colors---colors--nav-color": "#07291D",
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
