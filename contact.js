console.log("contact - connected - v1");

document.addEventListener("DOMContentLoaded", (event) => {
    // PAGE LOAD
    gsap.timeline()
    .set(".contact-header-wrap", { visibility: "visible" })
    .set(".contact-text-wrap", { visibility: "visible" }, "<")
    .to(".contact-text-wrap", { opacity: 1, duration: 0.7, stagger: 0.15, ease: "power1.out" })
    .from(".contact-text-wrap", { yPercent: 5, duration: 0.7, stagger: 0.15, ease: "power1.out" }, "<")
    .to(".contact-header-wrap", { opacity: 1, duration: 0.7, ease: "power1.out" }, 0.3)
    .from(".contact-header-wrap", { yPercent: 5, duration: 0.7, ease: "power1.out" }, "<");
});
