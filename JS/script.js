const API_ENDPOINT = "http://127.0.0.1:8000";

const mostrarFecha = () => {
    let fecha = new Date();

    let Dia = (fecha.getDate());
    let Mes = (fecha.getMonth());
    let Anio = (fecha.getFullYear());
    
    document.getElementById("dia-Actual").innerHTML = `Fecha de hoy: ${Dia}/${Mes+1}/${Anio}`;
}

// Llenar lista de pacientes

const popularLista = () => {
    const URL = API_ENDPOINT + "/pacientes/"

    let elementoSelect = document.getElementById("lista-pacientes");

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
            console.log(cita)
            let tr = tabla.insertRow(-1)

            tr.id = cita.id

            celdaHora = tr.insertCell(-1)
            celdaNombre = tr.insertCell(-1)


            celdaHora.innerHTML = cita.hora
            celdaNombre.innerHTML = cita.paciente.nombre
            celdaHora.className = "row-data";
            celdaNombre.className = "row-data";

            // Codigo repetido, posible refactorizacion disponible.

            let btn = document.createElement("button");
            btn.innerHTML = "Modificar Cita";

            btn.onclick = function (e) {
                let rowId = e.target.parentNode.parentNode.id;

                const data = Array.from(document.getElementById(rowId).querySelectorAll(".row-data"));

                for(const [index, element] of data.entries()){
                    console.log(index, element.innerHTML);
                }
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

            btn.onclick = function (e) {
                let rowId = e.target.parentNode.parentNode.id;

                const data = Array.from(document.getElementById(rowId).querySelectorAll(".row-data"));

                for(const [index, element] of data.entries()){
                    console.log(index, element.innerHTML);
                }
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

    console.log(id, fecha, hora)

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

//Codigo JS de LOGIN

function validar()
		{
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



/*
Recursos para js:
    https://www.geeksforgeeks.org/how-to-send-row-data-when-clicking-button-using-javascript/
    https://sebhastian.com/javascript-create-button/
    https://www.encodedna.com/javascript/populate-json-data-to-html-table-using-javascript.htm
*/
