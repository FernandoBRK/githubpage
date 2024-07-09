const menu = document.querySelector('.hamburguesa'); // Selecciona el botón del menú de hamburguesa
const navegacion = document.querySelector('.navegacion'); // Selecciona el contenedor de navegación
const imagenes = document.querySelectorAll('img'); // Selecciona todas las imágenes en el documento
const btnTodos = document.querySelector('.todos'); // Selecciona el botón "Todos"
const btnEnsaladas = document.querySelector('.ensaladas'); // Selecciona el botón "Ensaladas"
const btnPasta = document.querySelector('.pasta'); // Selecciona el botón "Pasta"
const btnPizza = document.querySelector('.pizza'); // Selecciona el botón "Pizza"
const btnPostres = document.querySelector('.postres'); // Selecciona el botón "Postres"
const contenedorPlatillos = document.querySelector('.platillos'); // Selecciona el contenedor de platillos
document.addEventListener('DOMContentLoaded',()=>{
    eventos();
    platillos();
});

const eventos = () =>{ 
    menu.addEventListener('click',abrirMenu); // Añade un evento de clic al botón del menú de hamburguesa para abrir el menú
}

const abrirMenu = () =>{ // Muestra el menú de navegación
     navegacion.classList.remove('ocultar');
     botonCerrar(); // Llama a la función para crear el botón de cerrar
}

const botonCerrar = () =>{
    const btnCerrar = document.createElement('p');
    const overlay  = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    // Evita agregar múltiples overlays
    if(document.querySelectorAll('.pantalla-completa').length > 0) return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');

    // while(navegacion.children[5]){
    //     navegacion.removeChild(navegacion.children[5]);
    // }
    navegacion.appendChild(btnCerrar);    // Añade el botón de cerrar al menú de navegación
    cerrarMenu(btnCerrar,overlay);
    
}

const observer = new IntersectionObserver((entries, observer)=>{ // Observa las entradas para cargar imágenes cuando sean visibles
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                const imagen = entry.target;
                imagen.src = imagen.dataset.src;  // Cambia la fuente de la imagen
                observer.unobserve(imagen);
            }
        }); 
});


imagenes.forEach(imagen=>{
   
    observer.observe(imagen);
});

const cerrarMenu = (boton, overlay) =>{ // Añade eventos de clic al botón de cerrar y al overlay para ocultar el menú
    boton.addEventListener('click',()=>{
        navegacion.classList.add('ocultar'); // Oculta el menú de navegación
        overlay.remove(); // Elimina el overlay
        boton.remove(); // Elimina el botón de cerrar
    });

    overlay.onclick = function(){ // Elimina el overlay
        overlay.remove(); 
        navegacion.classList.add('ocultar');  
        boton.remove();
    }
}

const platillos = () =>{ // Crea un arreglo para los platillos
    let platillosArreglo = [];
    const platillos = document.querySelectorAll('.platillo'); // Selecciona todos los platillos

    platillos.forEach(platillo=> platillosArreglo = [...platillosArreglo,platillo]);  // Añade cada platillo al arreglo de platillos
    // Filtra los platillos por categoría
    const ensaladas = platillosArreglo.filter(ensalada=> ensalada.getAttribute('data-platillo') === 'ensalada');
    const pastas = platillosArreglo.filter(pasta => pasta.getAttribute('data-platillo') === 'pasta');
    const pizzas = platillosArreglo.filter(pizza => pizza.getAttribute('data-platillo') === 'pizza');
    const postres = platillosArreglo.filter(postre=> postre.getAttribute('data-platillo') === 'postre');
    // Llama a la función para mostrar los platillos según la categoría
    mostrarPlatillos(ensaladas, pastas, pizzas, postres, platillosArreglo);

}

const mostrarPlatillos = (ensaladas, pastas, pizzas, postres, todos) =>{ // Añade eventos de clic a los botones para filtrar los platillos por categoría
    btnEnsaladas.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos); // Limpia el contenedor de platillos
        ensaladas.forEach(ensalada=> contenedorPlatillos.appendChild(ensalada)); // Muestra solo las ensaladas
    });
    //se repite lo mismo en cada clase
    btnPasta.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
         pastas.forEach(pasta=> contenedorPlatillos.appendChild(pasta));
    });

    btnPizza.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        pizzas.forEach(pizza=> contenedorPlatillos.appendChild(pizza));
    });
    btnPostres.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        postres.forEach(postre=> contenedorPlatillos.appendChild(postre));
    });
    btnTodos.addEventListener('click',()=>{
        limpiarHtml(contenedorPlatillos);
        todos.forEach(todo=> contenedorPlatillos.appendChild(todo));
    });
}

const limpiarHtml = (contenedor) =>{ 
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}