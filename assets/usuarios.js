
document.addEventListener("DOMContentLoaded", () => {
    fetchData()

});

const fetchData = async (url = "https://reqres.in/api/users?delay=3&page") => {
    //console.log('obteniendo datos...')
    try{
        loadingData(true);

        const response = await fetch(url);
        const data = await response.json();

        // console.log(data);
        traerUsuarios(data);

    } catch (error) {
        console.log(error);
    } finally {
        loadingData(false);
    }
};

const traerUsuarios = data => {
    const cards = document.getElementById('card-dinamics')
    cards.textContent = "";
    const templateCard  = document.getElementById('template-card').content
    const fragment = document.createDocumentFragment() 
    console.log(data);
    data.data.forEach(item => {
        // console.log(item);
        const clone = templateCard.cloneNode(true)
        clone.querySelector("h4").textContent = item.first_name;
        clone.querySelector("h5").textContent = item.last_name;
        clone.querySelector("p").textContent = item.email;
        clone.querySelector(".card-img-top").setAttribute("src", item.avatar);

        // Guardamos en el fragment para evitar el reflow
        fragment.appendChild(clone)
    });

    cards.appendChild(fragment);
    pintarPaginacion(data.total_pages);
}

const pintarPaginacion = data => {
    
    console.log(data);
    const paginacion = document.getElementById("paginacion");
    paginacion.textContent = "";
    const templatePaginacion = document.getElementById("template-paginacion").content
    const clone = templatePaginacion.cloneNode(true)

    paginacion.appendChild(clone);

    paginacion.addEventListener('click', e =>{
        if(e.target.matches(".btn-outline-light")){
            console.log("click");
            fetchData("https://reqres.in/api/users?delay=3&page=1")
        }
        if(e.target.matches(".btn-outline")){
            console.log("click");
             fetchData("https://reqres.in/api/users?delay=3&page=2")
        }
    })
}

// pintar el loading
const loadingData = estado => {
    const loading = document.getElementById("loading");
    if(estado){
        loading.classList.remove('d-none');
    } else {
        loading.classList.add('d-none');
    }
   
}
