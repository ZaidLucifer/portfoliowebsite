
gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    reloadOnContextChange: true
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

var cursor_doc = document.getElementById("cursor");
var cursor = document.querySelector("#cursor")
var main = document.querySelector("body")

function animate_cursor() {
main.addEventListener("mousemove", function(events) {
    cursor.style.left = events.x + 10 + "px"
    cursor.style.top = events.y + 10 + "px"
    cursor.style.padding = "5px 5px"
})
}

animate_cursor()

gsap.from(".navbar-item", {
y: -50
}, "navbar-anim")
gsap.from(".about-me-name", {
opacity: 0
}, "navbar-anim")
gsap.from(".about-me-left-center h3", {
opacity: 0
}, "navbar-anim")
gsap.from(".about-me-image", {
y: 500
}, "navbar-anim")

var active = 5
var circle_controls = document.querySelectorAll("#circle-control .controls")
var circle_content = document.querySelectorAll(".circle-content .right")

circle_content.forEach(function(content) {
content.addEventListener("mouseenter", function() {
    cursor.style.width = "6vw"
    cursor.style.height = "6vw"
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
var years = elem.getAttribute("years")
var minYears = 1;
var maxYears = 8;
var width = ((years - minYears) / (maxYears - minYears)) * 100;
elem.style.width = width+"vw";
console.log(width+"vh");
elem.addEventListener("mouseenter", function() {
    var star_count = elem.getAttribute("count")
    cursor.style.height = "4vh"
    cursor.style.width = "10vw"
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
    trigger: "#work-datas",
    scroller: "#main",
    //markers: true,
    start: "top 100%",
    end: "bottom 120%",
    scrub: 3
}
})

tl2.from(".content", {
x: "-10vh"
}, "work-data-anim")
tl2.from(".thumbnail", {
x: "100%"
}, "work-data-anim")
tl2.from("#prev", {
opacity: 0
}, "work-data-anim")
tl2.to("#prev", {
opacity: 1
}, "work-data-anim")
tl2.from("#next", {
opacity: 0
}, "work-data-anim")
tl2.to("#next", {
opacity: 1
}, "work-data-anim")

var tl3 = gsap.timeline({
scrollTrigger: {
    trigger: "#skills-page",
    scroller: "#main",
    //markers: true,
    start: "top 80%",
    end: "bottom 100%",
    scrub: 2
}
})
tl3.from(".skills-set", {
    rotationX: "0deg",
}, "skills-page-anim")
tl3.to("#skills-set-1", 100, {
    rotationX: "1080deg",
    delay: 10,
}, "skills-page-anim")
tl3.to("#skills-set-2", 100, {
    rotationX: "1080deg",
    delay: 20,
}, "skills-page-anim")
tl3.to("#skills-set-3", 100, {
    rotationX: "1080deg",
    delay: 30,
}, "skills-page-anim")
tl3.to("#skills-set-4", 100, {
    rotationX: "1080deg",
    delay: 40,
}, "skills-page-anim")
tl3.to("#skills-set-5", 100, {
    rotationX: "1080deg",
    delay: 50,
}, "skills-page-anim")
tl3.to("#skills-set-6", 100, {
    rotationX: "1080deg",
    delay: 60,
}, "skills-page-anim")
tl3.to("#skills-set-7", 100, {
    rotationX: "1080deg",
    delay: 70,
}, "skills-page-anim")
tl3.from(".skills-heading", {
opacity: 0
}, "skills-page-anim")
tl3.to(".skills-heading", {
opacity: 1
}, "skills-page-anim")

var tl4 = gsap.timeline({
scrollTrigger: {
    trigger: "#contact-page",
    scroller: "#main",
    //markers: true,
    start: "top 90%",
    end: "bottom 100%",
    scrub: 3
}
})
tl4.from(".skills-set", {
opacity: 1
}, "contact-page-anim")
tl4.from(".skills-heading", {
opacity: 1
}, "contact-page-anim")
tl4.to(".skills-set", {
opacity: 0
}, "contact-page-anim")
tl4.to(".skills-heading", {
opacity: 0
}, "contact-page-anim")
tl4.from("#contact-page", {
backgroundColor: "#000"
}, "contact-page-anim")

var company_names = document.querySelectorAll(".company-names");
var nokia = document.querySelector(".company-nokia")
var ericsson = document.querySelector(".company-ericsson")

function hide_other_company() {
var work_datas = document.querySelectorAll(".work-data");
work_datas.forEach(function(work_data) {
    work_data.style.display = "none"
})
}

function update_text_color_for_other_company_name() {
var company_names = document.querySelectorAll(".company-names");
company_names.forEach(function(company) {
    company.style.color = "#000"
})
}

company_names.forEach(function(company) {
company.addEventListener("click", function() {
    hide_other_company()
    var company_tag = document.querySelector(company.getAttribute("company"))
    company_tag.style.display = "block"
    update_text_color_for_other_company_name()
    this.style.color = "#C38D9E"
})
})


// var duration = document.querySelectorAll(".duration")
// duration.forEach(function(elem) {
//     elem.addEventListener("mouseenter", function() {
//         cursor.style.width = "10vw"
//         cursor.style.height = "5vh"
//         cursor.style.alignItems = "center"
//         cursor.style.justifyContent = "center"
//         cursor.style.borderRadius = "0"
//         cursor.style.fontSize = "1.2rem"
//         cursor.style.letterSpacing = "0.1rem"
//         cursor.style.color = "#fff"
//         cursor.style.textTransform = "uppercase"
//         cursor.innerHTML = "duration"
//     })
//     elem.addEventListener("mouseleave", function() {
//         cursor.style.height = "30px"
//         cursor.style.width = "30px"
//         cursor.style.borderRadius = "50%"
//         cursor.innerHTML = ""
//     })
// })

// var position = document.querySelectorAll(".position")
// position.forEach(function(elem) {
//     elem.addEventListener("mouseenter", function() {
//         cursor.style.width = "10vw"
//         cursor.style.height = "5vh"
//         cursor.style.alignItems = "center"
//         cursor.style.justifyContent = "center"
//         cursor.style.borderRadius = "0"
//         cursor.style.fontSize = "1.2rem"
//         cursor.style.letterSpacing = "0.1rem"
//         cursor.style.color = "#fff"
//         cursor.style.textTransform = "uppercase"
//         cursor.innerHTML = "position"
//     })
//     elem.addEventListener("mouseleave", function() {
//         cursor.style.height = "30px"
//         cursor.style.width = "30px"
//         cursor.style.borderRadius = "50%"
//         cursor.innerHTML = ""
//     })
// })

// var project_name = document.querySelectorAll(".project-name")
// project_name.forEach(function(elem) {
//     elem.addEventListener("mouseenter", function() {
//         cursor.style.width = "13vw"
//         cursor.style.height = "5vh"
//         cursor.style.alignItems = "center"
//         cursor.style.justifyContent = "center"
//         cursor.style.fontSize = "1.2rem"
//         cursor.style.borderRadius = "0"
//         cursor.style.letterSpacing = "0.1rem"
//         cursor.style.color = "#fff"
//         cursor.style.textTransform = "uppercase"
//         cursor.innerHTML = "project"
//     })
//     elem.addEventListener("mouseleave", function() {
//         cursor.style.height = "30px"
//         cursor.style.width = "30px"
//         cursor.style.borderRadius = "50%"
//         cursor.innerHTML = ""
//     })
// })

// var responsibilities = document.querySelectorAll(".responsibilities")
// responsibilities.forEach(function(elem) {
//     elem.addEventListener("mouseenter", function() {
//         var company_name = elem.getAttribute("company-name")
//         cursor.style.width = "13vw"
//         cursor.style.height = "5vh"
//         cursor.style.alignItems = "center"
//         cursor.style.justifyContent = "center"
//         cursor.style.fontSize = "1.2rem"
//         cursor.style.borderRadius = "0"
//         cursor.style.letterSpacing = "0.1rem"
//         cursor.style.color = "#fff"
//         cursor.style.textTransform = "uppercase"
//         cursor.innerHTML = company_name
//     })
//     elem.addEventListener("mouseleave", function() {
//         cursor.style.height = "30px"
//         cursor.style.width = "30px"
//         cursor.style.borderRadius = "50%"
//         cursor.innerHTML = ""
//     })
// })

const anchorLinks = document.querySelectorAll('a[href^=\\#]:not([href$=\\#])');

anchorLinks.forEach((anchorLink) => {
let hashval = anchorLink.getAttribute('href');
let target = document.querySelector(hashval);

anchorLink.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    locoScroll.scrollTo(target);
});
});

/* work-data */
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let workdataDom = document.querySelector('#work-datas');
let SliderDom = workdataDom.querySelector('#work-datas .work-data-content');
let thumbnailBorderDom = document.querySelector('#work-datas .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.work-data');
let timeDom = document.querySelector('#work-datas .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 800;

nextDom.onclick = function(){
showSlider('next');    
}

prevDom.onclick = function(){
showSlider('prev');    
}
let runTimeOut;
function showSlider(type){
let  SliderItemsDom = SliderDom.querySelectorAll('#work-datas .work-data-content .work-data');
let thumbnailItemsDom = document.querySelectorAll('#work-datas .thumbnail .work-data');

if(type === 'next'){
    SliderDom.appendChild(SliderItemsDom[0]);
    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
    workdataDom.classList.add('next');
}else{
    SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
    thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
    workdataDom.classList.add('prev');
}
clearTimeout(runTimeOut);
runTimeOut = setTimeout(() => {
    workdataDom.classList.remove('next');
    workdataDom.classList.remove('prev');
}, timeRunning);
}
