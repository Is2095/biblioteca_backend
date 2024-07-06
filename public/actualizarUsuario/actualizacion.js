
const $d = document;

const formulario = $d.getElementById('formularioActualizacion');
const $provincia = $d.getElementById("provincia");


formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = $d.getElementById('actualizacionEmail').value;
    const password = $d.getElementById('actualizacionContraseña').value;
    const nombre = $d.getElementById('actualizacionNombre').value;
    const apellido = $d.getElementById('actualizacionApellido').value;
    const edad = $d.getElementById('actualizacionEdad').value;
    const provincia = $d.getElementById('provincia').value;
    const fechaActual = $d.getElementById('actualizacionFechaActual').value;

    fetch('http://localhost:3001/api', {
        method: 'PUT',
        headers: {
                'Content-Type': 'application/json'
        },
        body: JSON.stringify({nombre: nombre, apellido: apellido, edad: edad, email: email, password: password, fechaActual: fechaActual, provincia: provincia})
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        if(res.usuario) {
            alert(`los datos del usuario: ${res.usuario}, fueron actualizado correctamente`)
            sessionStorage.setItem('usuario', res.usuario)
            sessionStorage.setItem('idUsuario', res.id_usuario)
            sessionStorage.setItem('imageUser', res.foto)
              window.location.href = '../index.html'
        }
    })
    .catch(err => console.log('error al actualizar datos'))

})

function provincias() {
    fetch("https://apis.datos.gob.ar/georef/api/provincias")
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(res => {
            let $opciones = `<option value="">Elige una Provincia</option>`;
            res?.provincias?.forEach(element => $opciones += `<option value="${element.nombre}">${element.nombre}</option>`);
            $provincia.innerHTML = $opciones;
        })
        .catch(error => console.log(error))
}
$d.addEventListener("DOMContentLoaded", provincias)


    document.getElementById('formulario').addEventListener('submit', function(event) {
        var password = document.getElementById('password').value;
        var confirmarPassword = document.getElementById('confirmarPassword').value;

        if (password !== confirmarPassword) {
            event.preventDefault(); // Evita que se envíe el formulario
            alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
        }
    });