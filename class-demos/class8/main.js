
// this is our very first event
// this is the ONLY way you should load the webpage
window.onload = () =>{
    let btn1 = document.getElementById('hi')

    // 3 ways to have events trigger something
    // 1) .addEventListener(eventName, function call)
    // btn1.addEventListener("click", hiButton)
    // 2) .addEventListener(eventName, anonymous function)
    // btn1.addEventListener('click', ()=>{
    //     console.log('hi button was pressed with anon function')
    // })

    // 3. shorthand for event name using anon function
    btn1.onclick = () => {
        console.log('hi button pressed with shorthand anon function')

        let rotate = document.getElementById('rotate')
        rotate.style.display = 'block'
        rotate.style.backgroundColor = 'cyan';
    }

    let btn2 = document.getElementById('hello')
    btn2.onclick = () =>{
        let rotate = document.getElementById('rotate')

        let leftPos = 0
        let speed = 1
        // only way we are managing time in this class for right now
        // 2 parameters:
        // 1. function
        // 2. time (in ms)
        setInterval( ()=>{
            // increasing leftPos by 1
            leftPos += speed
            if(leftPos > window.innerWidth - 100 || leftPos < 0){
                speed *= -1
            }
            rotate.style.left = leftPos
        }, 10)
    }

    let btn3 = document.getElementById('rot')
    btn3.onclick = () => {
        let rotate = document.getElementById('rotate')

        let angle = 0;

        setInterval( () =>{
            angle++
            // rotate.style.transform = "rotate(" + angle + "deg)"
            rotate.style.transform = `rotate(${angle}deg)`
        }, 40)
    }
}

// function declarations need to happen outside window.onload
function hiButton(){
    console.log('hi button was pressed')
}