
function toggleFavorite(button, dato) {

    const corazonRojo = button.classList.toggle('active');
   
    if (!corazonRojo) {
        fetch(`http://localhost:3001/api`, { 
            method: 'DELETE' ,
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({id: dato.id, id_usuario: dato.id_usuario})
        })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err));
    } else {
        fetch(`http://localhost:3001/api/favoritos`, {
             method: 'POST',
             headers: {
                'Content-Type': 'application/json'
             },
             body: JSON.stringify(dato)
            })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };
};