// ---- USER INPUTS FROM DOM ---- //

const lokacija = document.querySelector("#lokacija");
const krovAzimut = document.querySelector("#orjentacija");
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

let azimut;
let lat;
let lon;

// define variables based on user selection
function setInputs() {
    switch (krovAzimut.value) {
        case "S":
            azimut = 180;
            break;
        case "I":
            azimut = -90;
            break;
        case "Z":
            azimut = 90;
            break;
        case "J":
            azimut = 0;
            break;
        case "SI":
            azimut = -135;
            break;
        case "SZ":
            azimut = 135;
            break;
        case "JI":
            azimut = -45;
            break;
        case "JZ":
            azimut = 45;
            break;
    }

    switch (lokacija.value) {
        case "daruvar":
            lat = 45.59;
            lon = 17.23;
            break;
        case "dubrovnik":
            lat = 42.65;
            lon = 18.09;
            break;
        case "gospic":
            lat = 44.54;
            lon = 15.38;
            break;
        case "karlovac":
            lat = 45.48;
            lon = 15.55;
            break;
        case "osijek":
            lat = 45.55;
            lon = 18.68;
            break;
        case "pula":
            lat = 44.87;
            lon = 13.86;
            break;
        case "rijeka":
            lat = 45.33;
            lon = 14.44;
            break;
        case "split":
            lat = 43.51;
            lon = 16.47;
            break;
        case "varazdin":
            lat = 46.30;
            lon = 16.34;
            break;
        case "zadar":
            lat = 44.12;
            lon = 15.24;
            break;
        case "zagreb":
            lat = 45.80;
            lon = 15.99;
            break;
    }
    
}

// fetch data from API
const fetchData = async (city) => {

    const params = new URLSearchParams({
        lat: lat,
        lon: lon,
        angle: krovNagib.value,
        peakpower: 1,
        loss: 14,
        aspect: azimut,
        outputformat: "json"
    });

    const url = `/api/?${params}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === "404") {
        alert("city not found");
        return;
    }
    if (data.cod === 401) {
        alert('Invalid API Key')
        return
    }

    console.log(data);
}

setInputs()

const fetchBtn = document.querySelector("#fetch");
fetchBtn.addEventListener("click", fetchData);