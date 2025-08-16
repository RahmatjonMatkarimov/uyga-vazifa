function hisobla() {
    const masofa = parseFloat(document.getElementById("masofa").value);

    if (isNaN(masofa) || masofa <= 0) {
        alert("Iltimos, masofani to‘g‘ri kiriting!");
        return;
    }

    const transportlar = {
        "Piyoda": 3.6,
        "Velosiped": 20.1,
        "Mashina": 70,
        "Samolyot": 800
    };

    function vaqtniFormatla(soatDecimal) {
        let soat = Math.floor(soatDecimal);
        let daqiqa = Math.round((soatDecimal - soat) * 60);
        if (daqiqa === 60) { soat += 1; daqiqa = 0; }
        return `${soat} soat ${daqiqa} daqiqa`;
    }

    document.getElementById("piyoda").textContent =
        `Piyoda: ${vaqtniFormatla(masofa / transportlar["Piyoda"])}`;
    document.getElementById("velosiped").textContent =
        `Velosiped: ${vaqtniFormatla(masofa / transportlar["Velosiped"])}`;
    document.getElementById("mashina").textContent =
        `Mashina: ${vaqtniFormatla(masofa / transportlar["Mashina"])}`;
    document.getElementById("samolyot").textContent =
        `Samolyot: ${vaqtniFormatla(masofa / transportlar["Samolyot"])}`;
}
function convert() {
    const celsius = parseFloat(document.getElementById("celsius").value);
    const fahrenheit = (celsius * 9/5) + 32;
    document.getElementById("fahrenheit").value = fahrenheit.toFixed(1) + " °F";
}

function jog() {
    const temp = parseFloat(document.getElementById("tempJog").value);
    const raining = document.getElementById("rain").checked;
    const hallOpen = document.getElementById("hall").checked;
    let result = "borib bolmaydi";
    if (!raining && temp >= 0 && temp <= 35) {
        result = "borsa boladi";
    } else if (raining && hallOpen) {
        result = "borsa boladi";
    }
    document.getElementById("jogResult").textContent = result;
}
