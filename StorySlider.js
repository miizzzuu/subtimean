function togglePopup () {
    document.getElementById("popup-1").classList.toggle("active");
    document.getElementById("popup-2").classList.toggle("active");
}

gsap.registerPlugin(ScrollTrigger)

gsap.utils.toArray('.section').forEach(section => {
    ScrollTrigger.create({

        trigger: section,
        start: 'top top',
        pin: true,
        pinSpacing: false
    })
})