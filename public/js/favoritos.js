
function toggleFavorite(button, dato) {

    const corazonRojo = button.classList.toggle('active');
   
    if (!corazonRojo) {
        // fetch(`http://localhost:3001/api`, { 
        fetch(`https://biblioteca-backend-y7iu.vercel.app/api`, { 
            method: 'DELETE' ,
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({id: dato.id, id_usuario: dato.id_usuario})
        })
            .then(res => res.json())
            .then(res => console.log())
            .catch(err => console.log('se ha producido un error '));
    } else {
        // fetch(`http://localhost:3001/api/favoritos`, {
        fetch(`https://biblioteca-backend-y7iu.vercel.app/api/favoritos`, {
             method: 'POST',
             headers: {
                'Content-Type': 'application/json'
             },
             body: JSON.stringify(dato)
            })
            .then(res => res.json())
            .then(res => console.log())
            .catch(err => console.log('se ha producido un error'));
    };
};