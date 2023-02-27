const hr = document.querySelector(".sat #hr");
const min = document.querySelector(".sat #min");
// const sec = document.querySelector(".sec");

setInterval(() => {

    let day = new Date()
    let hour = day.getHours()
    let minutes = day.getMinutes()
    // let seconds = day.getSeconds()

    let hrAngle = (30 * hour) + (0.5 * minutes);
    let minAngle = 6 * minutes;
    // let secAngle = 6 * seconds;

    hr.style.transform = `translateY(-200%) translateX(130%) rotate(${hrAngle}deg)`;
    min.style.transform = `translateY(-200%) translateX(209%) rotate(${minAngle}deg)`
    
});