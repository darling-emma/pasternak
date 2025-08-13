document.addEventListener("DOMContentLoaded", (event) => {    
    gsap.set(".transition", { display: "flex" });

    // Load Lottie
    const animation = lottie.loadAnimation({
        container: document.getElementById("transition-lottie"),
        path: "https://cdn.prod.website-files.com/67e1766388730f0773341855/689cd8e11f07b09198c1f7c6_Pasternak_LoadAnimation_081325.json",
        renderer: "svg",
        autoplay: false,
    });

    let loadTL = gsap.timeline();

    loadTL
    .call(function() {animation.play()})
    .to({}, { duration: 4 })
    .to(".transition-lottie", { opacity: 0, duration: 0.1 }, "<90%")
    .to(".transition", { yPercent: -100, ease: "power2.out", duration: 0.7 }, "<")
    .set(".transition", { display: "none" })
    .call(function() {animation.pause()});

    // PAGE LOAD
    SplitText.create(".load-split", {
        type: "lines",
        autoSplit: true,
        onSplit(self) {
            return gsap.timeline()
            .to(".load-split", { duration: 3.8 })
            .set(".load-split", { visibility: "visible" })
            .set(self.lines, { opacity: 0 }, "<")
            .set(".load-split", { opacity: 1 }, "<")
            .to(self.lines, { opacity: 1, duration: 0.7, stagger: 0.15, ease: "power1.out" })
            .from(self.lines, { yPercent: 5, duration: 0.7, stagger: 0.15, ease: "power1.out" }, "<")
        }
    });
});
