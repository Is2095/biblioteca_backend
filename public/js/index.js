
const $d = document;
const entrar = $d.getElementById('hrefEntrar');
const salir = $d.getElementById('hrefSalir');
const registrarse = $d.getElementById('hrefRegistrarse');
const botonFavorito = $d.getElementById('botonFavorito');
const user = $d.getElementById('hrefUser');
const nombreLibro = $d.getElementById('libroPorTitulo');
const loading = $d.getElementById('loading')


let datoUsuario = sessionStorage.getItem('idUsuario');
if (datoUsuario !== null) {
    entrar.style.opacity = '0';
    salir.style.opacity = '1';
    user.style.opacity = '1';
    registrarse.style.opacity = '0';
} else {
    entrar.style.opacity = '1';
    salir.style.opacity = '0';
    user.style.opacity = '0';
    registrarse.style.opacity = '1';
};
const usuarioLogin = async () => {
    fetch('http://localhost:3001/protegida')
        .then(res => res.json())
        .then(res => {
            if (res.err) {
                sessionStorage.clear()
                datoUsuario = sessionStorage.getItem('idUsuario');
            }
        })
        .catch(err => console.log(err))
    
};
usuarioLogin();
setInterval(function() {
    const a = sessionStorage.getItem('usuario')
    if (a !== null) {
        entrar.style.opacity = '0';
        salir.style.opacity = '1';
        user.style.opacity = '1';
        registrarse.style.opacity = '0';
    } else {
        entrar.style.opacity = '1';
        salir.style.opacity = '0';
        user.style.opacity = '0';
        registrarse.style.opacity = '1';
    };
}, 10000);

const rutaProtegida = document.getElementById('rutaProtegida')
rutaProtegida.addEventListener('click', (e) => {
    e.preventDefault()
    fetch('http://localhost:3001/protegida')
        .then(res => res.json())
        .then(res => {
            const mensaje = res.err ?? res.message
            alert(mensaje)
            if (res.err) {
                sessionStorage.clear()
                usuarioLogin()
            }
            window.location.href = './index.html'
        })
        .catch(err => { })
})
const llamar = async (categoria) => {

    usuarioLogin()
   
    let nombreDelLibro = '';

    const contenedor = document.getElementById('librosBD');
    contenedor.innerHTML = '';

    const id_usuario = sessionStorage.getItem('idUsuario');

    const response = await fetch(`http://localhost:3001/api/favoritos/${parseInt(id_usuario)}`);
    const arrayFavoritos = await response.json();

    loading.style.display = 'block'

    const insertarDatos = (datos) => {
        datos.forEach((objeto, index) => {
            const div = document.createElement('div');
            div.classList.add('carousel-item');
            if (index === 0) {
                div.classList.add('active');
            };

            const { id, authors, description, imageLink, language, pageCount, title, publishedDate, id_libro } = objeto;
            const datosLibroFavorito = { id, authors, description, imageLink, language, pageCount, title, publishedDate, id_usuario, categoria };
            const esFavorito = arrayFavoritos.some(elemt => elemt.id === id);

            if (true) {
                div.innerHTML = `
                    <button id="botonCorazon" class="botonCorazon ${esFavorito ? "active" : ""} ${datoUsuario ? "" : "noHayDatos"}">
                    <i class="bi bi-heart-fill"></i>
                    </button>
                    <img class="imagenCarrusel" src="${imageLink ? imageLink : "http://static.tvmaze.com/images/no-img/no-img-portrait-text.png"}"></img>
                    <p>título ${title}</p>
                    <p>Autor ${authors}</p>
                    <p>fecha de impreso: ${publishedDate}</p>
                    <p>cantidad de hojas: ${pageCount}</p>
                    `;
                const boton = div.querySelector('#botonCorazon');
                boton.addEventListener('click', () => toggleFavorite(boton, datosLibroFavorito))
                loading.style.display = 'none';
                contenedor.appendChild(div);
            };
        });
    };
    if (categoria === 'titulo') {
        nombreDelLibro = $d.getElementById('libroPorTitulo').value.toLowerCase();
    }
    fetch(`http://localhost:3001/api/libros?nombreLibro=${nombreDelLibro}&categoria=${categoria}`)
        .then(res => res.json())
        .then(res => insertarDatos(res))
        .catch(err => console.log(err));
};  