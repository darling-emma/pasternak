console.log("connected - scenarios - v2");

document.addEventListener("DOMContentLoaded", (event) => {    
    // PAGE LOAD
    gsap.from(".load-split", { 
        autoAlpha: 0,
        opacity: 0, 
        yPercent: 5, 
        duration: 1,
    });

    let activeItem = null;

    gsap.utils.toArray(".scenario-item").forEach((item) => {
        
        // Select only that item's wrapper + button
        const wrapper = item.querySelector(".scenario-reveal-wrapper");
        const button = item.querySelector(".scenario-button");
        const preview = item.querySelector(".preview");

        function closeItem() {
            let closeTL = gsap.timeline();
            closeTL
            .to(wrapper, { height: 0, opacity: 0, duration: 0.5, ease: "power1.out" })
            .to(button, { rotation: 0, duration: 0.5, ease: "power1.out" }, "<")
            .to(preview, { height: "auto", duration: 0.5, ease: "power1.out" }, "<")
            .to(preview, { opacity: 1, duration: 0.3, ease: "power1.in" }, "<70%");
        }

        function openItem() {
            let openTL = gsap.timeline();
            openTL
            .to(preview, { opacity: 0, duration: 0.3, ease: "power1.in" })
            .to(wrapper, { height: "auto", opacity: 1, duration: 0.5, ease: "power1.out"})
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
                    .to(prevPreview, { height: "auto", duration: 0.5, ease: "power1.out" }, "<")
                    .to(prevPreview, { opacity: 1, duration: 0.3, ease: "power1.in" },"<70%");
                }
                openItem();
                activeItem = item;
            }
        }); 
    });
})
