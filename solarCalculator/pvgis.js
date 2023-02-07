console.log("helou vorld");

async function fetchData() {
    const data = await fetch('https://re.jrc.ec.europa.eu/api/PVcalc?lat=45&lon=8&peakpower=1&loss=14&outputformat=json')
        .then(response => response.json())
        .then(json => {
            console.log(json.outputs.monthly)
            // proceed(json);
        })
}

async function getData() {
    try {
        fetchData()
    } catch (error) {
        console.log("something went wrong with api fetch:", error);
    }
}

function proceed(json) {
    return new Promise((resolve, reject) => {
        resolve("success");
    });
    console.log(json.outputs.monthly.fixed[1]);
}

fetchData();
