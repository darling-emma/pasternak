console.log("connected - scenarios - v1.5");

document.addEventListener("DOMContentLoaded", (event) => {    
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
});
