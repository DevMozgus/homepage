import "./font/otf/otfFont.css";
import "./font/woff/woffFont.css";
import "./fullpage.min.css"
import "./style.css"

import { TweenMax, TimelineMax } from "gsap/all"; 
import fullpage from './scripts/fullpage.min.js';

let img = new Image();
img.src = require('./img/preview.png');

const plugins = [ TweenMax ]

new fullpage("#fullpage", {
  //scrollHorizontally: true,
  licenseKey: null,
  autoScrolling: true,
  navigation: true,
  fitToSelection: true,
  paddingTop: "50px",
  paddingBottom: "100px",
  recordHistory: false,
  onLeave: (origin, destination, direction) => {
    if (!(document.documentElement.clientWidth <= 850 || window.innerWidth <= 850)) {
      const nextSection = destination.item
      const title = nextSection.querySelector("h1")
      const timeline = new TimelineMax({ delay: 0.5})
      timeline.fromTo(title,  { y: 50, opacity: 0}, { duration: 0.5, y: 0, opacity: 1})
      if (destination.index === 0) {
        timeline.fromTo("#title",  { y: 50, opacity: 0}, { duration: 0.6, y: 0, opacity: 1}, "-=0.5")
        timeline.fromTo("#CTA",  { opacity: 0}, { duration: 0.6, opacity: 1}, "-=0.5")
      } else if (destination.index === 1) {
        timeline.fromTo(".fields",  { y: 50, opacity: 0}, { duration: 0.6, y: 0, opacity: 1}, "-=0.5")
        timeline.fromTo(".tech",  {  opacity: 0}, {  duration: 0.3, opacity: 1}, "-=0.4")
      } else {
        timeline.fromTo(".work",  {  opacity: 0}, { duration: 0.3, opacity: 1}, "-=0.4")
      }
    }
    },
    afterResize: (width, height) => {
      if (width <= 850 || document.documentElement.clientWidth <= 850 || window.innerWidth <= 850) {
        fullpage_api.setResponsive(true);
      } else {
        fullpage_api.setResponsive(false);
      }

    },
    anchors: ["main", "skills", "projects"]
})
const moveTo = (page) => {
  fullpage_api.moveTo(page, 1);
}

const toSkills = document.querySelectorAll(".skills")
const toWork = document.querySelectorAll(".projects")
document.querySelector("#home").addEventListener("click", () => moveTo("main"))


for (let b=0; b < toSkills.length; b++) {
  toSkills[b].addEventListener("click", () => moveTo("skills"))
}

for (let b=0; b < toWork.length; b++) {
  toWork[b].addEventListener("click", () => moveTo("projects"))
}

const tl = new TimelineMax()
tl.fromTo("#hi",  { x: -50, opacity: 0}, { duration: 0.8, x: 0, opacity: 1, ease: "Power2.easeOut"})
tl.fromTo("#img",  { x: -30, opacity: 0}, { duration: 0.8, x: 0, opacity: 1, ease: "Power2.easeOut"}, "-=0.8")
tl.fromTo("#title",  { x: 0, opacity: 0}, { duration: 1.2, x: 0, opacity: 1, ease: "Power2.easeOut"})
tl.fromTo("#CTA",  {opacity: 0}, {  duration: 1.2, opacity: 1}, "-=1.2")
tl.fromTo("#svg",  { opacity: 0}, { duration: 1.2, opacity: 1}, "+=1")
.fromTo("#svg",  { y: 0}, { duration: 0.5, y: 20, ease: "Power2.easeOut"}, "+=1")
.to("#svg",  { duration: 0.5, y: 0, ease: "Power2.easeOut"})


if (document.documentElement.clientWidth <= 850 || window.innerWidth <= 850) {
  fullpage_api.setResponsive(true);
} else {
  fullpage_api.setResponsive(false);
}