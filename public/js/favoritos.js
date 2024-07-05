
function toggleFavorite(button, dato) {

    const corazonRojo = button.classList.toggle('active');
   
    if (!corazonRojo) {
        fetch(`https://api`, { 
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
        fetch(`https://api/favoritos`, {
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