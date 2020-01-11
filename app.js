window.onload = function() {
	lax.setup() // init

	const updateLax = () => {
		lax.update(window.scrollY)
		window.requestAnimationFrame(updateLax)
	}

	window.requestAnimationFrame(updateLax)
}

const nav = document.getElementById('nav')
const bnth = document.getElementById('bnth')
const ldntxt = document.getElementById('ldnTxt').children
const ldnbtn = document.getElementById('ldnBtn')


const navListener = new IntersectionObserver(function(en,o){
    en.forEach(e=>{
        if(e.isIntersecting)
        {
            nav.classList.add("navtoggle")
        }else{
            nav.classList.remove("navtoggle")

        }
    })
},{rootMargin:"-50%"})
navListener.observe(bnth)

const t1 = new TimelineMax()

t1
.fromTo(ldntxt[0],.8,{x:"200%",opacity:"0"},{x:"0%",opacity:"1",ease:Power2.easeInOut})
.fromTo(ldntxt[1],.8,{x:"200%",opacity:"0"},{x:"0%",opacity:"1",ease:Power2.easeInOut},'-=0.5')
.fromTo(nav.children[0],.6,{y:"-200%"},{y:"0%",ease:Power2.easeInOut},'-=0.5')
.fromTo(nav.children[1],.6,{y:"-200%"},{y:"0%",ease:Power2.easeInOut},'-=0.5')
.fromTo(ldnbtn,.6,{y:"200%",opacity:"0"},{y:"0%",opacity:"1",ease:Power2.easeInOut},'-=0.5')

const quoteTxt = document.getElementById("quoteTxt")
const quoteImg = document.getElementById("quoteImg")

const quoteObs = new IntersectionObserver(function(en,o){
    en.forEach(e=>{
        const t2 = new TimelineMax()
        t2.to(quoteTxt,0,{opacity:"0"})
        t2.to(quoteImg,0,{opacity:"0"})
        if(e.isIntersecting){
            t2.fromTo(quoteTxt,.6,{x:"200%"},{x:"0%",opacity:"1",ease:Power2.easeInOut})
            .fromTo(quoteImg,.6,{x:"-200%"},{x:"0%",opacity:"1",ease:Power2.easeInOut},'-=0.4')
            o.unobserve(quoteImg)
        }
    })
},{rootMargin:"-20%"})
quoteObs.observe(quoteImg)
const sidenav = document.getElementById('sidenav')

function shownav(){
    sidenav.classList.toggle('navshown')
   
}