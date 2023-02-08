// ---- USER INPUTS FROM DOM ---- //

const lokacija = document.querySelector("#lokacija");
const krovAzimut = document.querySelector("#orjentacija");
const krovNagib = document.querySelector("#nagib");

const monthNames = ["sjecanj", "veljaca", "ozujak", "travanj", "svibanj", "lipanj", "srpanj", "kolovoz", "rujan", "listopad", "studeni", "prosinac"];
let potrosnjaVT = [];
let potrosnjaNT = [];
let solar = [69, 74, 141, 178, 192, 197, 213, 200, 158, 130, 87, 58]; // hardcoded values as starting point
let azimut;
let lat;
let lon;

const cijenaVT = document.querySelector("#cijenaVT").value;
const cijenaNT = document.querySelector("#cijenaNT").value;
const prijenosVT = document.querySelector("#prijenosVT").value;
const prijenosNT = document.querySelector("#prijenosNT").value;
const distVT = document.querySelector("#distVT").value;
const distNT = document.querySelector("#distNT").value;
const otkupVT = document.querySelector("#otkupVT").value;
const opskrba = document.querySelector("#opskrba").value;
const oie = document.querySelector("#oie").value;
const mjernaUsluga = document.querySelector("#mjernaUsluga").value;
const popust = document.querySelector("#popust").value;

let elektranakw = document.querySelector("#elektranakw");
let investicija = document.querySelector("#investicija");
let povrsinaKrova = document.querySelector("#povrsinaKrova");
let povratInvesticije = document.querySelector("#povratInvesticije");


// define variables based on user selection
const setInputs = () => {
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

    for (const month in monthNames) {
        potrosnjaVT[month] = parseInt(document.querySelector(`#${monthNames[month]}-VT`).value);
        potrosnjaNT[month] = parseInt(document.querySelector(`#${monthNames[month]}-NT`).value);
    }
}

const setElektranaInputs = () => {
    const zbrojPotrosnje = potrosnjaVT.reduce((sum, curr) => sum + curr) + potrosnjaNT.reduce((sum, curr) => sum + curr);
    // console.log("zbrojPotrosnje",zbrojPotrosnje);
    elektranakw.value = Math.round((zbrojPotrosnje * 0.5) / 100) / 10;
}

const izracunInvesticije = () => {
    investicija.value = (elektranakw.value * 700) + 2500;
    povrsinaKrova.innerHTML = `${(elektranakw.value / 0.4) * 2} m<sup>2</sup>`;
    // povratInvesticije ostalo za izračunati
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
    // console.log(data);
    return data;
}

const populateSolarArray = (data) => {
    const arrData = data.outputs.monthly.fixed;
    return arrData.map(month => parseInt(month.E_m * elektranakw.value));
}

const createCalculationObject = () => {
    let kupljenoHep = [];
    let prodanoHep = [];
    let kupljenoIznosNT = [];
    let prodanoIznos = [];

    for (i = 0; i < potrosnjaVT.length; i++) {
        razlika = potrosnjaVT[i] - solar[i];
        if (razlika < 0) {
            kupljenoHep[i] = 0;
            prodanoHep[i] = razlika * -1;
        } else {
            kupljenoHep[i] = razlika;
            prodanoHep[i] = 0;
        }
    }

    let kupljenoIznosVTprijeSolara = [...kupljenoHep];
    kupljenoIznosVTprijeSolara.forEach((item, i, arr) => {
        arr[i] = Math.round((item * cijenaVT + item * prijenosVT + item * distVT + item * oie) * 100) / 100;
    })
    kupljenoIznosNT = [...potrosnjaNT];
    kupljenoIznosNT.forEach((item, i, arr) => {
        arr[i] = Math.round((item * cijenaNT + item * prijenosNT + item * distNT + item * oie) * 100) / 100;
    })
    prodanoIznos = [...prodanoHep];
    prodanoIznos.forEach((item, i, arr) => {
        arr[i] = Math.round((item * otkupVT) * 100) / 100;
    })

    let kupljenoIznosVT = [...kupljenoIznosVTprijeSolara];
    let pretplata = 0;
    kupljenoIznosVT.forEach((item, i, arr) => {
        const rez = kupljenoIznosVTprijeSolara[i] - prodanoIznos[i];
        if (rez > 0 && pretplata <= 0) {
            kupljenoIznosVT[i] = rez;
        } else if (rez > 0 && pretplata > 0) {
            if (rez >= pretplata) {
                kupljenoIznosVT[i] = rez - pretplata;
                pretplata = 0;
            } else {
                kupljenoIznosVT[i] = 0;
                pretplata = pretplata - rez;
            }
        } else if (rez <= 0) {
            kupljenoIznosVT[i] = 0;
            pretplata += Math.abs(rez);
        }
    });


    return {
        monthNames, // nazivi mjeseci
        potrosnjaVT, // kWh potrosnja VT
        potrosnjaNT, // kWh potrosnja NT
        solar, // kWh proizvedeni
        kupljenoHep, //kWh kupljeni od hepa
        prodanoHep, //kWh prodani hepu
        kupljenoIznosVTprijeSolara, // eur VT energija, distribucija, prijenos
        kupljenoIznosNT, // eur NT energija, distribucija, prijenos
        prodanoIznos, // eur prodano hepu
        kupljenoIznosVT, // eur VT dijela, umanjen za prodani dio
        pretplata // eur pretplata na kraju godine - treba biti 0
    };
}


const izracunavaj = async () => {
    setInputs(); //složi inpute u varijable 
    setElektranaInputs();
    //const solarData = await fetchData(); // dohvati podatke o solarima
    //solar = populateSolarArray(solarData); // posloži array s podacima od pvgis
    izracunInvesticije();
    const calculationObj = createCalculationObject(); // izrada objekta s svim izračunima za mjesece
    console.log(calculationObj);
    // preračunaj
    // napravi i popuni tablicu
}

izracunavaj();

const fetchBtn = document.querySelector("#fetch");
fetchBtn.addEventListener("click", izracunavaj);