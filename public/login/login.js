
const $d = document;

const login = () => {
    const emailLogin = $d.getElementById('loginEmail');
    const passwordLogin = $d.getElementById('password');

<<<<<<< HEAD
    fetch('http://localhost:3001/api/usuario', {
=======
    // fetch('http://localhost:3001/api/usuario', {
    fetch('https://biblioteca-backend-y7iu.vercel.app/api/usuario', {
>>>>>>> main
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email : emailLogin.value, password: passwordLogin.value})
    })
    .then(resultado => resultado.json())
    .then(usuario => {
        if(usuario.err) {
            alert(usuario.err);
        } else {
<<<<<<< HEAD
            sessionStorage.setItem('usuario', `${usuario.nombre}, ${usuario.apellido}`)
            sessionStorage.setItem('idUsuario', usuario.id_usuario)
            sessionStorage.setItem('imageUser', usuario.foto)
=======
            sessionStorage.setItem('usuario', `${usuario.nombre}, ${usuario.apellido}`);
            sessionStorage.setItem('idUsuario', usuario.id_usuario);
            sessionStorage.setItem('imageUser', usuario.foto);
>>>>>>> main

            alert(`el usuario: "${usuario.nombre}" se encontró`);
            window.location.href = '../index.html';

    }   }) 
    .catch(err => console.log('error al logearse'));
};