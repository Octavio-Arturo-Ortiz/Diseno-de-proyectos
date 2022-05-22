const API_ENDPOINT = "http://127.0.0.1:8000";

const mostrarFecha = () => {
    let fecha = new Date();

    let Dia = (fecha.getDate());
    let Mes = (fecha.getMonth());
    let Anio = (fecha.getFullYear());
    
    document.getElementById("dia-Actual").innerHTML = `Fecha de hoy: ${Dia}/${Mes+1}/${Anio}`;
}

const obtenerCitas = () => {
    URL = API_ENDPOINT + "/citas/"

    mostrarFecha()

    fetch(URL).then(data => {
        return data.json()
    }).then(res => console.log(res))
}