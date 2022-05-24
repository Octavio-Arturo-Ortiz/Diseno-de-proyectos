const API_ENDPOINT = "https://appconsultorio.azurewebsites.net";


function validar() {
    var usuario = document.getElementById("usuario").value;
    var contraseña = document.getElementById("pass").value;	

    if(usuario == "admin" && contraseña == "password")
    {
        alert("Usuario y Contraseña validos, BUEN DIA!");
        window.location.href = "/HTML/index.html";
    }
    else
    {
        alert("Verifique sus credenciales (contraseña o usuario no valido)");
    }
}



const mostrarFecha = () => {
    let fecha = new Date();

    let Dia = (fecha.getDate());
    let Mes = (fecha.getMonth());
    let Anio = (fecha.getFullYear());
    
    document.getElementById("dia-Actual").innerHTML = `Fecha de hoy: ${Dia}/${Mes+1}/${Anio}`;
}

// Llenar lista de pacientes


const cargarDatosPaciente = () => {
    const id_paciente = new URLSearchParams(window.location.search).get("id_paciente");
    const URL = API_ENDPOINT + `/pacientes/${id_paciente}`

    const formPaciente = Array.from(document.getElementById("datos-paciente").querySelectorAll("input:not(#btnModificar)"));

    

    fetch(URL)
    .then(res => { return res.json( )})
    .then(paciente => {
        formPaciente.forEach(campo => {
            campo.value = paciente[campo.id]
        });
    });
}

const cargarDatosCita = () => {
    const id_cita = new URLSearchParams(window.location.search).get("id_cita");
    const URL = API_ENDPOINT + `/citas/${id_cita}`

    popularLista()

    const fecha = document.getElementById("fecha");
    const hora = document.getElementById("hora-cita");

    fetch(URL)
    .then(res => { return res.json( )})
    .then(cita => {
        fecha.value = cita.fecha
        hora.value = cita.hora
    });
}

const popularLista = () => {
    const URL = API_ENDPOINT + "/pacientes/"

    const elementoSelect = document.getElementById("lista-pacientes");

    fetch(URL).then(response => { return response.json() }).then(data => {
        data.forEach(paciente => {
            let option = document.createElement("option");

            option.value = paciente.id
            option.innerHTML = `${paciente.nombre} ${paciente.apaterno}`

            elementoSelect.appendChild(option)
        })
    })
}

// Seria convenienten hacer una funcion aparte para cargar citas en la pagina principal. Esta sirve para el apartado de Visualizar Cita
const obtenerCitas = () => {
    const URL = API_ENDPOINT + "/citas/"
    let tabla = document.querySelector(".datos-clientes");

    fetch(URL).then(data => {
        return data.json()
    }).then(res => {
        res.forEach(cita => {
            let tr = tabla.insertRow(-1)

            tr.id = cita.id

            celdaHora = tr.insertCell(-1)
            celdaNombre = tr.insertCell(-1)


            celdaHora.innerHTML = cita.hora
            celdaNombre.innerHTML = `${cita.paciente.nombre} ${cita.paciente.apaterno}`
            celdaHora.className = "row-data";
            celdaNombre.className = "row-data";

            // Codigo repetido, posible refactorizacion disponible.

            let btn = document.createElement("button");
            btn.innerHTML = "Modificar Cita";

            btn.onclick = (e) => {
                let rowId = e.target.parentNode.parentNode.id;

                window.location.href = `/HTML/modificar-cita.html?id_cita=${rowId}`
            }

            tr.insertCell(-1).appendChild(btn);

        })
    });
};

const obtenerPacientes = () => {
    const URL = API_ENDPOINT + "/pacientes/"

    let tabla = document.querySelector(".datos-clientes")

    fetch(URL).then(response => {
        return response.json();
    }).then(data => {
        data.forEach(element => {
            let tr = tabla.insertRow(-1);
            tr.id = element.id

            for (const key in element) {
                let tabCell = tr.insertCell(-1)
                tabCell.innerHTML = element[key]
                tabCell.className = "row-data"
            }

            let btn = document.createElement("button");
            btn.innerHTML = "Modificar Datos";

            btn.onclick = (e) => {
                let rowId = e.target.parentNode.parentNode.id;

                window.location.href = `/HTML/modificar-datos.html?id_paciente=${rowId}`
            }

            tr.insertCell(-1).appendChild(btn);
        })
    });
}

// Funciones para registrar
const registrarPaciente =  () =>{

    const URL = API_ENDPOINT + "/pacientes/"

    const formData = document.getElementById("form-nuevo-paciente").querySelectorAll('input:not(#btnRegistrarPaciente)');

    let data = {}

    formData.forEach(field => {
        data[field.id] = field.value
    })

    fetch(URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(res => {return res.json()})
        .then(data => console.log(data))
}   


const registrarCita =  () => {

    const URL = API_ENDPOINT + "/citas/"

    const id = document.getElementById("lista-pacientes").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora-cita").value;

    if(id == 0){
        alert("Por favor, seleccione un paciente");
        return;
    }

    const cita = {
        fecha: fecha, 
        hora: hora,
        id_paciente: id
    }

    fetch(URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cita)
        })
        .then(res => {return res.json()})
        .then(data => console.log(data))
}   


const actualizarPaciente = () => {
    const id_paciente = new URLSearchParams(window.location.search).get("id_paciente");
    const URL = API_ENDPOINT + `/pacientes/${id_paciente}`

    const formData = document.getElementById("datos-paciente").querySelectorAll('input:not(#btnModificar)');

    const data = {}

    formData.forEach(field => {
        data[field.id] = field.value
    })

    data.id = id_paciente

    fetch(URL, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(res => {return res.json()})
        .then(data => alert(`Registro con ID: ${data.id} actualizado`))   
}

const actualizarCita = () => {
    const id_cita = new URLSearchParams(window.location.search).get("id_cita");
    const URL = API_ENDPOINT + `/citas/${id_cita}`

    const id = document.getElementById("lista-pacientes").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora-cita").value;

    if(id == 0){
        alert("Por favor, seleccione un paciente");
        return;
    }

    const cita = {
        fecha: fecha, 
        hora: hora,
        id_paciente: id
    }

    fetch(URL, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cita)
        })
        .then(res => { return res.json() })
        .then(data => alert(`Cita con ID: ${data.id} modificada`))
}

/*
Recursos para js:
    https://www.geeksforgeeks.org/how-to-send-row-data-when-clicking-button-using-javascript/
    https://sebhastian.com/javascript-create-button/
    https://www.encodedna.com/javascript/populate-json-data-to-html-table-using-javascript.htm
*/