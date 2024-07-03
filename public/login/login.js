
const $d = document;

const login = () => {
    const emailLogin = $d.getElementById('loginEmail')

    fetch('http://localhost:3001/api/usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email : emailLogin.value})
    })
    .then(resultado => resultado.json())
    .then(usuario => {
        if(usuario.err) {
            alert('el usuario no existe')
        } else {
            sessionStorage.setItem('usuario', usuario.nombre)
            sessionStorage.setItem('idUsuario', usuario.id_usuario)
            sessionStorage.setItem('imageUser', usuario.foto)

            alert(`el usuario: ${usuario.nombre} se encontró`)
            window.location.href = '../index.html'

    }   }) 
    .catch(err => console.log(err))
}