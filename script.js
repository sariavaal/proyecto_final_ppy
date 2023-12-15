document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("calcular").addEventListener("click", () => {
        const cantPersonas = document.getElementById("cantPersonas").value;
        const caloriasTotales = calcularCalorias(cantPersonas);
        calcularPorciones(cantPersonas);


        const cuadros = document.querySelectorAll(".cuadros");
        for (let i = 0; i < cuadros.length; i++) {
            cuadros[i].style.display = "inline-block";
        }
        const listaActividades = document.getElementById("lista-actividades");
        const tiempos = calcularTiempoGastoCalorico(caloriasTotales);
        listaActividades.innerHTML = "";
        for (const actividad in tiempos) {
            const tiempo = tiempos[actividad];
            let tiempoFormateado = `${tiempo}`;
            if (tiempo >= 60) {
                tiempoFormateado = formatearTiempo(tiempo);
            }
            listaActividades.innerHTML += `<li>${actividad}: ${tiempoFormateado}</li>`
        }
    })
})
var propiedadesAlimenticias = [
    {//posicion 0 es arroz
        calorias: 130,
        grasas: 0.3,
        carbohidratos: 28.15,
        proteinas: 2.7,
        gramosPorPersona: 100,
        mlPorPorcion: 200
    },
    {//posicion 1 es frijol
        calorias: 138,
        grasas: 0.5,
        carbohidratos: 25.15,
        proteinas: 9.05,
        gramosPorPersona: 50
    },
    { //posicion 2 es fideos
        calorias: 253,
        grasas: 1.5,
        carbohidratos: 49.4,
        proteinas: 9.3,
        gramosPorPersona: 100
    },
]

//array de objetos para actividades físicas por minuto
var actividadesFisicas = [
    { actividad: "running", caloriasPorMinuto: 11 },
    { actividad: "caminar", caloriasPorMinuto: 5 },
    { actividad: "saltos con cuerda", caloriasPorMinuto: 11 },
    { actividad: "zumba", caloriasPorMinuto: 8 },
    { actividad: "pilates", caloriasPorMinuto: 4 },
    { actividad: "yoga", caloriasPorMinuto: 4 },
    { actividad: "sedentarismo", caloriasPorMinuto: 1 }
];

//funcion para calcular porciones de arroz
function calcularPorciones(cantPersonas) {
    // 100 gramos de arroz crudo por persona
    const gramosPorPersona = propiedadesAlimenticias[document.getElementById("alimento").value].gramosPorPersona;
    const mlPorPorcion = propiedadesAlimenticias[document.getElementById("alimento").value].mlPorPorcion;
    const total = gramosPorPersona * cantPersonas; 
    const mlTotal = mlPorPorcion * cantPersonas;
    //mostrar resultado
    mostrarMensaje(`El total para ${cantPersonas} personas es: ${total} gramos y la cantidad de agua para preparar es: ${mlTotal} ml.`);
    //valores para los cuadritos
    document.getElementById("calorias").textContent = "Calorias: " + calcularCalorias(cantPersonas) + emojis().caloriasEmoji;
    document.getElementById("grasas").textContent = "Grasas: " + calcularGrasas(total) + emojis().grasasEmoji;
    document.getElementById("carbohidratos").textContent = "Carbohidratos: " + calcularCarbohidratos(total) + emojis().carbohidratosEmoji;
    document.getElementById("proteinas").textContent = "Proteinas: " + calcularProteinas(total) + emojis().proteinasEmoji;

}
//funcion para calcular grasas, carbos, proteinas y calorias
function calcularGrasas(total) {
    //cada 100 gramos de arroz tiene 0.3 gramos de grasa
    const grasaPorCienGramos = propiedadesAlimenticias[document.getElementById("alimento").value].grasas;
    const grasaTotales = (total / 100) * grasaPorCienGramos;
    return grasaTotales.toFixed(2);
}
function calcularCarbohidratos(total) {
    const carbohidratosPorCienGramos = propiedadesAlimenticias[document.getElementById("alimento").value].carbohidratos;
    const carbohidratosTotales = (total / 100) * carbohidratosPorCienGramos;
    return carbohidratosTotales.toFixed(2);
}

function calcularProteinas(total) {
    const proteinasPorCienGramos = propiedadesAlimenticias[document.getElementById("alimento").value].proteinas;
    const proteinasTotales = (total / 100) * proteinasPorCienGramos;
    return proteinasTotales.toFixed(2);

}
function calcularCalorias(cantPersonas) { // total = total de gramos que se consumen en total
    //cada cien gramos de arroz tiene 130 kcal
    const caloriasPorCienGramos = propiedadesAlimenticias[document.getElementById("alimento").value].calorias;
    const caloriasTotales = cantPersonas * caloriasPorCienGramos;
    return caloriasTotales.toFixed();

}

//funcion para calcular gasto calórico
function calcularTiempoGastoCalorico(caloriasTotales) {
    var tiempos = {};
    const cantPersonas = document.getElementById("cantPersonas").value;
    for (let i = 0; i < actividadesFisicas.length; i++) {
        const actividad = actividadesFisicas[i].actividad;
        const caloriasPorMinuto = actividadesFisicas[i].caloriasPorMinuto;
        //console.log(actividad, caloriasPorMinuto);
        const tiempo = caloriasTotales / caloriasPorMinuto; //tiempo en minutos
        tiempos[actividad] = formatearTiempo((tiempo / cantPersonas).toFixed(2));
    }
    return tiempos;
}
//Crear funcion para formatear minutos a horas:minutos
function formatearTiempo(tiempo) {
    const horas = Math.floor(tiempo / 60);
    const minutos = tiempo % 60;
    if (horas == 0) {
        return `${minutos}min`;
    } else if (minutos == 0) {
        return `${horas}h`;
    } else if (minutos < 10) {
        return `${horas}h 0${minutos}min`;
    } else if (horas < 10) {
        return `0${horas}h ${minutos}min`;
    }else{
        return `${horas}h ${minutos}min`;
    }
}


//funcion para alerts
function mostrarMensaje(mensaje) {
    document.getElementById("msg").innerHTML = mensaje;

}
//unicodes
function emojis() {
    //emoji de fuego
    const caloriasEmoji = "\u{1F525}";
    const grasasEmoji = "\u{1F951}";
    const carbohidratosEmoji = "\u{1F954}";
    const proteinasEmoji = "\u{1F357}";
    return {
        caloriasEmoji,
        grasasEmoji,
        carbohidratosEmoji,
        proteinasEmoji
    }
}
