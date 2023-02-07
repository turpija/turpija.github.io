// ---- USER INPUTS FROM DOM ---- //

const lokacija = document.querySelector("#lokacija");
const krovOrjentacija = document.querySelector("#orjentacija");
const krovNagib = document.querySelector("#nagib");

const sjecanjVT = document.querySelector("#sjecanj-VT");
const sjecanjNT = document.querySelector("#sjecanj-NT");
const veljacaVT = document.querySelector("#veljaca-VT");
const veljacaNT = document.querySelector("#veljaca-NT");
const ozujakVT = document.querySelector("#ozujak-VT");
const ozujakNT = document.querySelector("#ozujak-NT");
const travanjVT = document.querySelector("#travanj-VT");
const travanjNT = document.querySelector("#travanj-NT");
const svibanjVT = document.querySelector("#svibanj-VT");
const svibanjNT = document.querySelector("#svibanj-NT");
const lipanjVT = document.querySelector("#lipanj-VT");
const lipanjNT = document.querySelector("#lipanj-NT");
const srpanjVT = document.querySelector("#srpanj-VT");
const srpanjNT = document.querySelector("#srpanj-NT");
const kolovozVT = document.querySelector("#kolovoz-VT");
const kolovozNT = document.querySelector("#kolovoz-NT");
const rujanVT = document.querySelector("#rujan-VT");
const rujanNT = document.querySelector("#rujan-NT");
const listopadVT = document.querySelector("#listopad-VT");
const listopadNT = document.querySelector("#listopad-NT");
const studeniVT = document.querySelector("#studeni-VT");
const studeniNT = document.querySelector("#studeni-NT");
const prosinacVT = document.querySelector("#prosinac-VT");
const prosinacNT = document.querySelector("#prosinac-NT");

const prodVT = document.querySelector("#prodVT");
const prodNT = document.querySelector("#prodNT");
const prijenosVT = document.querySelector("#prijenosVT");
const prijenosNT = document.querySelector("#prijenosNT");
const distVT = document.querySelector("#distVT");
const distNT = document.querySelector("#distNT");
const otkupVT = document.querySelector("#otkupVT");
const opskrba = document.querySelector("#opskrba");
const oie = document.querySelector("#oie");
const mjernaUsluga = document.querySelector("#mjernaUsluga");
const popust = document.querySelector("#popust");

const elektranakw = document.querySelector("#elektranakw");
const investicija = document.querySelector("#investicija");

async function fetchData() {
    console.log("click");
    // const response = await fetch('https://re.jrc.ec.europa.eu/api/PVcalc?lat=45&lon=8&peakpower=1&loss=14&outputformat=json', {
    //         mode: "no-cors"
    //     })
    //     .then(function (response) {
    //         response.status //=> number 100–599
    //         response.statusText //=> String
    //         response.headers //=> Headers
    //         response.url //=> String

    //         console.log(response.status);
    //     }, function (error) {
    //         error.message //=> String
    //     })

    fetch('https://re.jrc.ec.europa.eu/api/PVcalc?lat=45&lon=8&peakpower=1&loss=14&outputformat=json')
        .then(response => response.json())
        .then(json => console.log(json))

}





const fetchBtn = document.querySelector("#fetch");
fetchBtn.addEventListener("click", fetchData);