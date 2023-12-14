document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("calcular").addEventListener("click", () => {
        const cantPersonas = document.getElementById("cantPersonas").value;
        const alimento = document.getElementById("alimento").value;
        const genero = document.getElementById("generoPersona").value;
        calcularPorciones(cantPersonas);
        
    })
})
var propiedadesAlimenticias = [
    {//posicion 0 es arroz
        calorias: 130,
        grasas: 0.3,
        carbohidratos: 28.15,
        proteinas: 2.7,
        gramosPorPersona: 100
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
//funcion para calcular porciones de arroz
function calcularPorciones(cantPersonas) {
    // 100 gramos de arroz crudo por persona
    const gramosPorPersona = propiedadesAlimenticias[document.getElementById("alimento").value].gramosPorPersona;
    const total = gramosPorPersona * cantPersonas;
    //mostrar resultado
    mostrarMensaje(`El total para ${cantPersonas} personas es: ${total} gramos`);
    //valores para los cuadritos
    document.getElementById("calorias").textContent = "Calorias: " + calcularCalorias (total);
    document.getElementById("grasas").textContent = "Grasas: " + calcularGrasas (total);
    document.getElementById("carbohidratos").textContent = "Carbohidratos: " + calcularCarbohidratos(total);
    document.getElementById("proteinas").textContent = "Proteinas: " + calcularProteinas(total);

    }
    //funcion para calcular grasas, carbos, proteinas y calorias
    function calcularGrasas(total){
        //cada 100 gramos de arroz tiene 0.3 gramos de grasa
        const grasaPorCienGramos = propiedadesAlimenticias[document.getElementById("alimento").value].grasas;
        const grasaTotales = (total / 100) * grasaPorCienGramos;
        return grasaTotales.toFixed(2);
    }
    function calcularCarbohidratos(total){
        const carbohidratosPorCienGramos = propiedadesAlimenticias[document.getElementById("alimento").value].carbohidratos;
        const carbohidratosTotales = (total / 100) * carbohidratosPorCienGramos;
        return carbohidratosTotales.toFixed(2);
    }

    function calcularProteinas(total){
        const proteinasPorCienGramos = propiedadesAlimenticias[document.getElementById("alimento").value].proteinas;
        const proteinasTotales = (total / 100) * proteinasPorCienGramos;
        return proteinasTotales.toFixed(2);
    
    }
    function calcularCalorias(total) { 
        //cada cien gramos de arroz tiene 130 kcal
        const caloriasPorCienGramos = propiedadesAlimenticias[document.getElementById("alimento").value].calorias;
        const caloriasTotales = (total / 100) * caloriasPorCienGramos;
        return caloriasTotales.toFixed(2);

     }

     function calcularCaloriasHombres() {
        

     }

     function calcularCaloriasMujeres() {
     
    }

//funcion para alerts
function mostrarMensaje(mensaje){
    document.getElementById("msg").innerHTML = mensaje;
}
