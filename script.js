document.addEventListener('DOMContentLoaded', () => {
    // 1. Definir los elementos del DOM donde se mostrará la información
    const diaActualElemento = document.getElementById('dia-actual');
    const fraseElemento = document.getElementById('frase-motivadora');
    const leccionElemento = document.getElementById('leccion-dia');

    // 2. Obtener el día actual y el nombre del día
    const fecha = new Date();
    const diaDelMes = fecha.getDate(); // 1 al 31
    
    // Opciones para formatear el nombre del día y el mes
    const opcionesFecha = { weekday: 'long', day: 'numeric', month: 'long' };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);

    // Muestra la fecha actual
    diaActualElemento.textContent = `Hoy es: ${fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1)}`;

    // 3. Cargar el contenido desde el archivo JSON
    fetch('frases.json')
        .then(response => {
            // Verifica si la respuesta es exitosa
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo frases.json');
            }
            return response.json();
        })
        .then(data => {
            // El índice en el array JSON es 'día del mes - 1'
            // Ya que los arrays empiezan en 0, pero los días empiezan en 1.
            const indiceDia = diaDelMes - 1; 

            // 4. Verificar si existe contenido para el día actual
            if (data[indiceDia]) {
                const contenidoDelDia = data[indiceDia];
                
                // 5. Insertar la frase y la lección en la página
                fraseElemento.innerHTML = contenidoDelDia.frase; // Usamos innerHTML para respetar los **bold**
                leccionElemento.innerHTML = contenidoDelDia.leccion;
            } else {
                // Mensaje si no hay contenido para el día (ej. día 30 o 31 si solo hay 29 entradas)
                fraseElemento.textContent = "¡Vuelve mañana para más motivación!";
                leccionElemento.textContent = "No hay contenido programado para este día del mes.";
            }
        })
        .catch(error => {
            // Manejo de errores si el archivo JSON no se encuentra o está mal
            console.error('Error al cargar el contenido:', error);
            fraseElemento.textContent = "Error al cargar el contenido. Revisa la consola.";
            leccionElemento.textContent = "Asegúrate de que el archivo frases.json exista y esté bien formado.";
        });
});
