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
const pdv = parseInt(document.querySelector("#pdv").value);

let elektranakw = document.querySelector("#elektranakw");
let investicija = document.querySelector("#investicija");
let povrsinaKrova = document.querySelector("#povrsinaKrova");
let povratInvesticije = document.querySelector("#povratInvesticije");
let ukupnoPotrosenoVT = document.querySelector("#ukupnoPotrosenoVT");
let ukupnoPotrosenoNT = document.querySelector("#ukupnoPotrosenoNT");
let ukupnoProizvedeno = document.querySelector("#ukupnoProizvedeno");


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

// izračun iznosa investicije i povrat
const izracunInvesticije = (calcObj) => {
    investicija.value = (elektranakw.value * 700) + 1500;
    let povrs = Math.round(((elektranakw.value / 0.4) * 2) * 100) / 100;
    povrsinaKrova.innerHTML = `${povrs} m<sup>2</sup>`;

    const ukupnoPrijeSolara = calcObj.iznosRacunaBezSolara.reduce((sum, curr) => sum + curr);
    const ukupnoNakonSolara = calcObj.iznosRacuna.reduce((sum, curr) => sum + curr);
    const godisnjaUsteda = ukupnoPrijeSolara - ukupnoNakonSolara;
    povratInvesticije.innerHTML = Math.round((investicija.value / godisnjaUsteda) * 10) / 10;
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

// get mjesecne vrijednosti solara 
const populateSolarArray = (data) => {
    const arrData = data.outputs.monthly.fixed;
    const ukupnaGodProizvodnja = data.outputs.totals.fixed.E_y;
    const ukupnaGodPotrosnjaVT = potrosnjaVT.reduce((sum, curr) => sum + curr);
    const ukupnaGodPotrosnjaNT = potrosnjaNT.reduce((sum, curr) => sum + curr);
    const ocekivanjaProizvodnja = ukupnaGodPotrosnjaVT * 0.95;
    const velicinaElektrane = Math.round((ocekivanjaProizvodnja / ukupnaGodProizvodnja) * 10) / 10;

    elektranakw.value = velicinaElektrane;
    ukupnoPotrosenoVT.innerHTML = Math.round(ukupnaGodPotrosnjaVT);
    ukupnoPotrosenoNT.innerHTML = Math.round(ukupnaGodPotrosnjaNT);
    ukupnoProizvedeno.innerHTML = Math.round(ocekivanjaProizvodnja);

    return arrData.map(month => parseInt(month.E_m * velicinaElektrane));
}


// izrada objekta s svim podacima, ulaznim i izračunatim
const createCalculationObject = () => {
    let kupljenoHep = [];
    let prodanoHep = [];
    let kupljenoIznosNT = [];
    let prodanoIznos = [];

    // izračun kupljenih i prodanih kWh nakon solara

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

    // izračun iznosa: VT, NT i prodano 

    let kupljenoIznosVTbezPretplate = [...kupljenoHep];
    kupljenoIznosVTbezPretplate.forEach((item, i, arr) => {
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

    // izračun dijela računa s VT iznosom umanjen za prodani dio, izračun pretplate

    let kupljenoIznosVT = [...kupljenoIznosVTbezPretplate];
    let pretplata = 0;
    kupljenoIznosVT.forEach((item, i, arr) => {
        const rez = kupljenoIznosVTbezPretplate[i] - prodanoIznos[i];
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

    // izračun iznosa računa VT+NT+naknade
    // (kupljenoIznosVT + kupljenoIznosNT + mjernaUsluga + opskrba) * pdv
    let iznosRacuna = [...kupljenoIznosVT];
    iznosRacuna.forEach((item, i, arr) => {
        let value = (arr[i] + kupljenoIznosNT[i] + Number(mjernaUsluga) + Number(opskrba)) * (Number(pdv) / 100 + 1);
        iznosRacuna[i] = Math.round(value * 100) / 100;
    })

    // izračun iznosa računa prije solara
    // (potrosnjaVT * cijena + potrosnjaVT * prijenos + potrosnjaVT * distribucija + potrosnjaVT * oie
    // + kupljenoIznosNT + mjernaUsluga + opskrba) * pdv
    let iznosRacunaBezSolara = [...potrosnjaVT];
    iznosRacunaBezSolara.forEach((item, i, arr) => {
        let kupljenoIzVT = (item * cijenaVT + item * prijenosVT + item * distVT + item * oie);
        let ukupno = (kupljenoIzVT + kupljenoIznosNT[i] + Number(mjernaUsluga) + Number(opskrba)) * (Number(pdv) / 100 + 1);
        arr[i] = Math.round(ukupno * 100) / 100;
    })

    return {
        monthNames, // nazivi mjeseci
        potrosnjaVT, // kWh potrosnja VT
        potrosnjaNT, // kWh potrosnja NT
        solar, // kWh proizvedeni
        kupljenoHep, //kWh kupljeni od hepa
        prodanoHep, //kWh prodani hepu
        kupljenoIznosVTbezPretplate, // eur VT energija, distribucija, prijenos bez prijenosa pretplaćenog dijela
        kupljenoIznosNT, // eur NT energija, distribucija, prijenos
        prodanoIznos, // eur prodano hepu
        kupljenoIznosVT, // eur VT dijela, umanjen za prodani dio
        pretplata, // eur pretplata na kraju godine - treba biti 0
        iznosRacuna, // eur iznos racuna, VT+NT+naknade+pdv
        iznosRacunaBezSolara // eur iznos racuna bez solarne elektrane, VT+NT+naknade+pdv
    };
}

// izrada i popunjavanje tablice
const createTable = (obj) => {
    //init table
    // let table = document.createElement('table');
    let table = document.querySelector("#tableCalc");
    table.innerHTML = "";
    
    let data = [obj.monthNames, obj.potrosnjaVT, obj.potrosnjaNT, obj.solar, obj.kupljenoHep, obj.prodanoHep, obj.iznosRacuna, obj.iznosRacunaBezSolara];
    let columnNames = ["mjesec", "potrošeno VT", "potrošeno NT", "solar", "kupljeno od HEPa", "prodano HEPu", "iznos računa", "iznos računa prije solara"];
    let footerArr = [
        "UKUPNO:",
        obj.potrosnjaVT.reduce((sum, curr) => sum + curr),
        obj.potrosnjaNT.reduce((sum, curr) => sum + curr),
        obj.solar.reduce((sum, curr) => sum + curr),
        obj.kupljenoHep.reduce((sum, curr) => sum + curr),
        obj.prodanoHep.reduce((sum, curr) => sum + curr),
        Math.round((obj.iznosRacuna.reduce((sum, curr) => sum + curr)) * 100) / 100,
        Math.round((obj.iznosRacunaBezSolara.reduce((sum, curr) => sum + curr)) * 100) / 100,
    ];

    // izrada thead
    let tableHead = document.createElement("THEAD");
    table.appendChild(tableHead);
    let newRow = tableHead.insertRow();

    for (let cell of columnNames) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = cell;
        newRow.appendChild(headerCell);
    }

    // izrada tbody
    let tableBody = document.createElement("TBODY");
    table.appendChild(tableBody);

    for (let red = 0; red < 12; red++) {
        let newRow = tableBody.insertRow();

        // let newRow = table.insertRow();
        for (let stupac = 0; stupac < data.length; stupac++) {
            let newCell = newRow.insertCell();
            newCell.innerHTML = data[stupac][red];
            // console.log(`data[${stupac}][${red}]`, data[stupac][red]); // red
        }
    }

    //izrada tfoot
    let tableFoot = document.createElement("TFOOT");
    table.appendChild(tableFoot);
    let footRow = tableFoot.insertRow();

    for (let cell of footerArr) {
        console.log("cell", cell);
        let footerCell = footRow.insertCell();
        footerCell.innerHTML = cell;
    }


    //dodavanje table u DOM
    document.body.appendChild(table);
}


const izracunavaj = async () => {
    setInputs(); //složi inpute u varijable 
    const solarData = await fetchData(); // dohvati podatke o solarima
    solar = populateSolarArray(solarData); // posloži array s podacima od pvgis
    const calculationObj = createCalculationObject(); // izrada objekta s svim izračunima za mjesece
    izracunInvesticije(calculationObj); //
    createTable(calculationObj); // napravi i popuni tablicu
    console.log(calculationObj);


}

// izracunavaj();

const fetchBtn = document.querySelector("#fetch");
fetchBtn.addEventListener("click", izracunavaj);