
// clase
class RolloAuditado {
    constructor(id, total, defecto) {
        this.id = id;
        this.total = total;
        this.defecto = defecto;
    }

    // Calcular porcentaje de merma
    calcularMerma() {
        return (this.defecto / this.total) * 100;
    }
}



// recuperar datos guardados
let rollos = JSON.parse(localStorage.getItem("rollos")) || [];


// obtener elementos
let boton = document.getElementById("btnAuditar");
let tabla = document.getElementById("tablaMermas");


// Funcion para guardar
boton.addEventListener("click", function() {

    let id = document.getElementById("idRollo").value;
    let total = Number(document.getElementById("mtsTotales").value);
    let defecto = Number(document.getElementById("mtsDefecto").value);

    // Validar datos
    if (id === "" || document.getElementById("mtsTotales").value === "" || document.getElementById("mtsDefecto").value === "") {
        alert("Completa todos los campos");
        return;
    }

    if (total <= 0 || defecto < 0) {
        alert("Ingresa cantidades validas");
        return;
    }

    //Validacion preventiva
    if (defecto > total) {
        alert("Los metros con defecto no pueden superar los metros totales");
        return;
    }

    // Crear nuevo rollo
    let nuevo = new RolloAuditado(id, total, defecto);

    // Agregar al arreglo
    rollos.push(nuevo);

    // Guardar en LocalStorage
    localStorage.setItem("rollos", JSON.stringify(rollos));

    // Actualizar tabla
    mostrarDatos();

    // Limpiar campos
    document.getElementById("idRollo").value = "";
    document.getElementById("mtsTotales").value = "";
    document.getElementById("mtsDefecto").value = "";
    }
);






// Funcion para mostrar los datos

function mostrarDatos() {
    tabla.innerHTML = "";
    rollos.forEach(function(rollo, indice) {

        let porcentaje = (rollo.defecto / rollo.total) * 100;
        let estado = porcentaje <= 5 ? "Buena" : "Deficiente";
        let fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${rollo.id}</td>
            <td>${rollo.total}</td>
            <td>${porcentaje.toFixed(2)}%</td>
            <td>${estado}</td>
            <td>
                <button onclick="eliminarRollo(${indice})">
                    Eliminar
                </button>
            </td>
        `;

        tabla.appendChild(fila);
    });
}


function eliminarRollo(indice) {

    rollos.splice(indice, 1);
    localStorage.setItem("rollos", JSON.stringify(rollos));
    mostrarDatos();
}




// Mostrar datos guardados al iniciar
mostrarDatos();
