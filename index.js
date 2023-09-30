function init() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

init()

var cursor_doc = document.getElementById("cursor");
var cursor = document.querySelector("#cursor")
var main = document.querySelector("body")

function animate_cursor() {
    main.addEventListener("mousemove", function(events) {
        cursor.style.left = events.x + 10 + "px"
        cursor.style.top = events.y + 10 + "px"
    })
}

animate_cursor()

gsap.from(".navbar-item", {
    y: -50
}, "navbar-anim")
gsap.from(".intro-content-1", {
    x: -50
}, "navbar-anim")
gsap.from(".intro-content-2", {
    x: 50
}, "navbar-anim")
gsap.from(".intro-content-3", {
    x: -50
}, "navbar-anim")

var tl0 = gsap.timeline({
    scrollTrigger: {
        trigger: "#intros",
        scroller: "#main",
        //markers: true,
        start: "top top",
        end: "bottom 30%",
        scrub: 3
    }
})

tl0.to(".intro-content-1", {
    x: 100
}, "intro-anim")
tl0.to(".intro-content-2", {
    x: -100
}, "intro-anim")
tl0.to(".intro-content-3", {
    x: 100
}, "intro-anim")
tl0.to("#intro-circle", {
    rotate: 0,
    ease: Expo.easeInOut,
    duration: 2
})

var tl1 = gsap.timeline({
    scrollTrigger: {
        trigger: "#about-me",
        scroller: "#main",
        //markers: true,
        start: "top 30%",
        end: "bottom 60%",
        scrub: 3
    }
})

tl1.to("#circle-control", {
    x: "2vw"
}, "circle-anim")

tl1.to("#intro-circle", {
    x: "-5vw"
}, "circle-anim")

var active = 5
var circle_controls = document.querySelectorAll("#circle-control .controls")
var circle_content = document.querySelectorAll(".circle-content .right")

circle_content.forEach(function(content) {
    content.addEventListener("mouseenter", function() {
        cursor.style.width = "6vw"
        cursor.style.height = "6vw"
        cursor.style.display = "flex"
        cursor.style.flexDirection = "column"
        cursor.style.alignItems = "center"
        cursor.style.justifyContent = "center"
        cursor.style.fontSize = "1.2rem"
        cursor.style.letterSpacing = "0.1rem"
        cursor.style.color = "#fff"
        cursor.innerHTML = "<div class='control-tag'>Controls</div><i class='ri-arrow-right-line'></i>"
    })
    content.addEventListener("mouseleave", function() {
        cursor.style.height = "30px"
        cursor.style.width = "30px"
        cursor.innerHTML = ""
    })
})
gsap.to(circle_controls[active - 1], {
    opacity: 1
})

gsap.to(circle_content[active - 1], {
    opacity: 1
})

function greyout() {
    gsap.to(circle_controls, {
        opacity: 0.1
    })
    gsap.to(circle_content, {
        opacity: 0.5
    })
}

circle_controls.forEach(function(elem, index) {
    elem.addEventListener("click", function() {
        gsap.to("#intro-circle", {
            rotate: (5 - (index + 1)) * 12,
            ease: Expo.easeInOut,
            duration: 1.5
        })
        greyout()
        gsap.to(this, {
            opacity: 1
        })
        gsap.to(circle_content[index], {
            opacity: 1
        })
    })
})

circle_controls.forEach(function(elem) {
    elem.addEventListener("mouseenter", function() {
        var number = elem.getAttribute("number")
        cursor.style.width = "5vw"
        cursor.style.height = "5vw"
        cursor.style.display = "flex"
        cursor.style.flexDirection = "row"
        cursor.style.alignItems = "center"
        cursor.style.justifyContent = "center"
        cursor.style.fontSize = "1.2rem"
        cursor.style.letterSpacing = "0.1rem"
        cursor.style.color = "#fff"
        cursor.innerHTML = number
    })

    elem.addEventListener("mouseleave", function() {
        cursor.style.height = "30px"
        cursor.style.width = "30px"
        cursor.innerHTML = ""
    })
})

circle_controls.forEach(function(elem) {
    elem.addEventListener("mouseenter", function() {
        var number = elem.getAttribute("number")
        cursor.style.width = "5vw"
        cursor.style.height = "5vw"
        cursor.style.display = "flex"
        cursor.style.alignItems = "center"
        cursor.style.justifyContent = "center"
        cursor.style.fontSize = "1.2rem"
        cursor.style.letterSpacing = "0.1rem"
        cursor.style.color = "#fff"
        cursor.innerHTML = number
    })

    elem.addEventListener("mouseleave", function() {
        cursor.style.height = "30px"
        cursor.style.width = "30px"
        cursor_doc.innerHTML = ""
    })
})

var skill_set = document.querySelectorAll(".skills-set")
skill_set.forEach(function(elem) {
    elem.addEventListener("mouseenter", function() {
        var star_count = elem.getAttribute("count")
        cursor.style.height = "4vh"
        cursor.style.width = "10vw"
        cursor.style.display = "flex"
        cursor.style.alignItems = "center"
        cursor.style.justifyContent = "center"
        cursor.style.color = "#fff"
        cursor.style.borderRadius = "0"
        for (let i = 0; i < star_count; i++) {
            cursor.innerHTML += '<i class="ri-star-s-fill"></i>'
        }
    })
    elem.addEventListener("mouseleave", function() {
        cursor.style.height = "30px"
        cursor.style.width = "30px"
        cursor.style.borderRadius = "50%"
        cursor.innerHTML = ""
    })
})

var tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: "#work-data",
        scroller: "#main",
        //markers: true,
        start: "top 30%",
        end: "bottom 110%",
        scrub: 3
    }
})

tl2.to("#work-data", {
    backgroundColor: "#fff"
}, "work-data-anim")
tl2.to(".work-data-content", {
    opacity: 1
}, "work-data-anim")

var tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: "#skills-page",
        scroller: "#main",
        // markers: true,
        start: "top 80%",
        end: "bottom 120%",
        scrub: 3
    }
})
tl3.to(".company-names-ericsson", {
    x: -500
}, "skills-page-anim")
tl3.to(".company-names-nokia", {
    x: 500
}, "skills-page-anim")
tl3.to(".work-data-content", {
    opacity: 0
}, "skills-page-anim")
tl3.from(".skills-heading", {
    y: -180
}, "skills-page-anim")
tl3.from(".skill-name", {
    y: -100
}, "skills-page-anim")
tl3.from(".skill-duration", {
    y: -100
}, "skills-page-anim")

var tl4 = gsap.timeline({
    scrollTrigger: {
        trigger: "#contact-page",
        scroller: "#main",
        // markers: true,
        start: "top 90%",
        end: "bottom 100%",
        scrub: 3
    }
})
tl4.to(".skill-name", {
    y: 50
}, "skills-page-anim")
tl4.to(".skill-duration", {
    y: 50
}, "skills-page-anim")
tl4.from("#contact-page", {
    backgroundColor: "#000"
}, "contact-page-anim")

var company_names = document.querySelectorAll(".company-names");
var company_work_data = document.querySelectorAll(".work-data");
var nokia = document.querySelector(".company-nokia")
var ericsson = document.querySelector(".company-ericsson")

company_work_data.forEach(function(work_data) {
    work_data.addEventListener("mouseenter", function(){
        var company_name = work_data.getAttribute("company-name")
        cursor.style.height = "10vh"
        cursor.style.width = "20vh"
        cursor.style.display = "flex"
        cursor.style.alignItems = "center"
        cursor.style.justifyContent = "center"
        cursor.style.color = "#fff"
        cursor.style.borderRadius = "0"
        cursor.style.textTransform = "uppercase"
        cursor.innerHTML = company_name
    })
    work_data.addEventListener("mouseleave", function() {
        cursor.style.height = "30px"
        cursor.style.width = "30px"
        cursor.style.textTransform = "None"
        cursor.style.borderRadius = "50%"
        cursor.innerHTML = ""
    })
})

function hide_other_company() {
    var company_work_data = document.querySelectorAll(".work-data");
    company_work_data.forEach(function(work_data) {
        work_data.style.display = "none"
    })
}

function update_company_name_hightlight() {
    var company_names = document.querySelectorAll(".company-names");
    company_names.forEach(function(company_name) {
        company_name.style.color = "#000"
    })
}

company_names.forEach(function(company) {
    company.addEventListener("click", function() {
        hide_other_company()
        update_company_name_hightlight()
        var company_tag = document.querySelector(company.getAttribute("company"))
        company_tag.style.display = "block"
        this.style.color = "#C38D9E"
    })
})