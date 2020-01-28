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



//setup vars
let container;
let camera;
let renderer;
let scene;
let cue;

function init(){
    container = document.querySelector('.scene');

    //create scene
    scene = new THREE.Scene();

    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 100000;
    
    //camera setup

    camera = new THREE.PerspectiveCamera(fov,aspect,near,far);

    camera.position.set(0,0,1);

    //light
    const ambient = new THREE.AmbientLight(0x404040,7);
    scene.add(ambient)

    const light = new THREE.DirectionalLight(0xd51d1b,2)
    light.position.set(10,10,100);
    scene.add(light)
    //renderer
    renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);


    //load model
    let loader = new THREE.GLTFLoader();
    loader.load('/tyr/scene.gltf',function(gltf){
        scene.add(gltf.scene);
        cue = gltf.scene.children[0]
        animate()
    });
    
}

function animate(){
    requestAnimationFrame(animate)
    cue.rotation.z += 0.005; 
    renderer.render(scene,camera)

}

init();