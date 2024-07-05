
const $d = document;

const login = () => {
    const emailLogin = $d.getElementById('loginEmail')
    const passwordLogin = $d.getElementById('password')

    fetch('https://api/usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email : emailLogin.value, password: passwordLogin.value})
    })
    .then(resultado => resultado.json())
    .then(usuario => {
        if(usuario.err) {
            alert(usuario.err)
        } else {
            sessionStorage.setItem('usuario', usuario.nombre)
            sessionStorage.setItem('idUsuario', usuario.id_usuario)
            sessionStorage.setItem('imageUser', usuario.foto)

            alert(`el usuario: "${usuario.nombre}" se encontró`)
            window.location.href = '../index.html'

    }   }) 
    .catch(err => console.log(err))
}