const mostrarFecha = () => {
    let fecha = new Date();

    let Dia = (fecha.getDate());
    let Mes = (fecha.getMonth());
    let Anio = (fecha.getFullYear());
    
    document.getElementById("dia-Actual").innerHTML = `Fecha de hoy: ${Dia}/${Mes+1}/${Anio}`;
}
