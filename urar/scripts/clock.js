const hr = document.querySelector(".hr");
const min = document.querySelector(".min");
const sec = document.querySelector(".sec");

setInterval(() => {

    let day = new Date()
    let hour = day.getHours()
    let minutes = day.getMinutes()
    let seconds = day.getSeconds()

    let hrAngle = (30 * hour) + (0.5 * minutes);
    let minAngle = 6 * minutes;
    let secAngle = 6 * seconds;

    hr.style.transform = `translate(-50%,-100%) rotate(${hrAngle}deg)`
    min.style.transform = `translate(-50%,-100%) rotate(${minAngle}deg)`
    sec.style.transform = `translate(-50%,-100%) rotate(${secAngle}deg)`
    
});