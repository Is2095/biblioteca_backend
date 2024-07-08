
const $d = document;

const $provincia = $d.getElementById("provincia");

function provincias() {
    fetch("https://apis.datos.gob.ar/georef/api/provincias")
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(res => {
            let $opciones = `<option value="Elige una Provincia">Elige una Provincia</option>`;
            res?.provincias?.forEach(element => $opciones += `<option value="${element.nombre}">${element.nombre}</option>`);
            $provincia.innerHTML = $opciones;
        })
        .catch(error => console.log(error));
}
$d.addEventListener("DOMContentLoaded", provincias);


document.getElementById('formulario').addEventListener('submit', function (event) {
    var password = document.getElementById('password').value;
    var confirmarPassword = document.getElementById('confirmarPassword').value;

    if (password !== confirmarPassword) {
        event.preventDefault(); // Evita que se envíe el formulario
        alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
    };
});




