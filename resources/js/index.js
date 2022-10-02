'use strict';

import Helpers from './helpers.js';
import Compilador from './compilador.js';
import Ejecutador from './ejecutador.js';
import Programa from './programa.js';
import Variable from './variable.js';
import Etiqueta from './etiqueta.js';


var memoriaPrincipal = new Array(0)
var procesos = new Array(0)


//-------------------OBJETOS---------------------\\
var compilador = new Compilador()
var ejecutador = new Ejecutador()



//--------------------BOTONES---------------------\\
const botonArchivo = document.getElementById("attachment");
const botonEjecutar = document.getElementById("ejecutar");
const botonPausar = document.getElementById("pausar");
const botonPasoaPaso = document.getElementById("pasoapaso");

//-----------------CONTENEDORES--------------------\\
const contenedorPantalla = document.getElementById("contenedorPantalla");
const contenedorCodigo = document.getElementById("contenedorCodigo");
const contenedorVariables = document.getElementById("contenedorVariables");
const contenedorEtiquetas = document.getElementById("contenedorEtiquetas");
const contenedorProgramas = document.getElementById("contenedor");
const contenedorMemoriaPrincipal = document.getElementById("contenedorCodigo");
const contenedorAcumuladora = document.getElementById("contenedorCodigo");
const contenedorPC = document.getElementById("contenedorCodigo");
const contenedorMemoria = document.getElementById("espacioMemoria")
const contenedorKernel = document.getElementById("espacioKernel");


document.addEventListener('DOMContentLoaded', event => {

    activarBoton()
    cargarArchivo()
    crearProceso()
    iniciarSistema()
    ejecutarProgramas()
});






// Cargar Archivo
function cargarArchivo() {
    // Creating a FileReader object using the constructor.
    const filereader = new FileReader();

    const filename = document.querySelector('input[type="file"]');
    filename.addEventListener('change', function () {


        // Reading a file as plain text
        filereader.readAsText(filename.files[0]);

        // Call this function to print the contents of the file
        // once the file has been read.
        filereader.onload = function () {
            mostrarInstrucciones(filereader.result); //////////////////
        };

        // Print the error incase there is one
        filereader.onerror = function () {
            console.log("Error: ", filereader.error);
        };
    }, false);
}
function mostrarInstrucciones(txt) {
    txt = txt.trim(); // quitar espacios o saltos innecesarios
    contenedorCodigo.value = txt;

    // mapear las instrucciones como un array de arrays
    const instrucciones = txt.split('\r\n').map(item => item.split(' '));

    return txt;
}
function activarBoton() {
    botonArchivo.addEventListener('click', function () {
        document.getElementById("file-input").click();
    });
}





// Ejecutar
function iniciarSistema() {

    botonPausar.addEventListener("click", () => {

        var espacioMemoria = contenedorMemoria.value
        var espacioKernel = parseInt(contenedorKernel.value)
        memoriaPrincipal.length = espacioMemoria

        memoriaPrincipal[0] = "Acumuladora"

        for (var i = 1; i < memoriaPrincipal.length; i++) {

            if (i <= espacioKernel + 1) {
                memoriaPrincipal[i] = "***CHSOS V2022***"
            }
            if (memoriaPrincipal[i] == null) {
                memoriaPrincipal[i] = " "
            }

        }

        generarTablaMemoria()

    })

}
function crearVariable(variable) {

    var nombre = variable[1]
    var tipo = variable[2]
    var valor = ""

    if(variable.length > 4){
        for(var i = 3; i < variable.length; i++){
            valor = valor + " " + variable[i]
        }
    }
    else{
        valor = variable[3]
    }




    var variable = new Variable(nombre, tipo, valor)

    return variable
}
function crearEtiqueta(etiqueta, instruccion) {

    var nombre = etiqueta[1]
    var valor = etiqueta[2]

    var etiqueta = new Etiqueta(nombre, valor, instruccion)

    return etiqueta
}




function crearProceso() {

    botonEjecutar.addEventListener("click", () => {

        var variables = []

        var codigo = contenedorCodigo.value

        let respuesta = compilador.compilarCodigo(codigo)
        let lineas = respuesta[0]
        let lineasEliminadas = respuesta[1]


        var id = procesos.length + 1
        var nombrePrograma = document.getElementById("file-input").files[0].name
        var numeroInstrucciones = lineas.length
        var rb = 0
        var rlc = 0
        var rlp = 0
        var contadorLineas = 0
        var contadorVariables = 0


        for (var i = 0; i <= memoriaPrincipal.length; i++) {
            if (memoriaPrincipal[i] == " ") {

                memoriaPrincipal[i] = lineas[contadorLineas]
                let palabras = lineas[contadorLineas].split(' ')

                if (palabras[0] == "nueva") {

                    let variable = crearVariable(palabras)
                    variables.push(variable)

                }

                if (palabras[0] == "etiqueta") {

                    let etiqueta = crearEtiqueta(palabras, lineas[contadorLineas])
                    memoriaPrincipal[i] = etiqueta

                }



                if (contadorLineas == 0) {
                    rb = i
                }
                if (contadorLineas == lineas.length - 1) {
                    rlc = i
                    break;
                }

                contadorLineas += 1
            }

        }

        for (var i = 0; i <= memoriaPrincipal.length; i++) {

            if (memoriaPrincipal[i] == " ") {

                memoriaPrincipal[i] = variables[contadorVariables]
                contadorVariables += 1

                if (contadorVariables == variables.length) {
                    rlp = variables.length + rlc
                    break
                }


            }


        }


        var proceso = new Programa(id, nombrePrograma, numeroInstrucciones, rb, rlc, rlp, lineasEliminadas)
        procesos.push(proceso)


        generarTablas()

        rb = 0
        rlc = 0
        rlp = 0
        contadorLineas = 0
        variables = []


    });


}

function ejecutarProgramas() {
    botonPasoaPaso.addEventListener("click", () => {


        let codigo = []

        for (var i = 0; i < procesos.length; i++) {
            
            for (var j = procesos[i].getRb(); j <= procesos[i].getRlp(); j++) {
                codigo.push(memoriaPrincipal[j])
            }
            ejecutador.ejecutarPrograma(procesos[i], codigo)
            console.log("\n\nPrograma: "+i+" Terminado\n\n")
            codigo = []
        }




    });
}
















// GENERAR TABLAS

function generarTablas() {
    generarTablaMemoria()
    generarTablaProcesos()
    generarTablaVariables()
    generarTablaEtiquetas()
}


function generarTablaMemoria() {
    document.getElementById('tablaMemoria').innerHTML = "";

    let table = document.createElement('table');
    table.setAttribute("id", "tablasCodigo");

    let tbody = document.createElement('tbody');

    table.appendChild(tbody);

    for (var i = 0; i < memoriaPrincipal.length; i++) {
        let row = document.createElement('tr');
        let identificador = document.createElement('td');
        identificador.innerHTML = i
        let valor = document.createElement('td');

        if (memoriaPrincipal[i] instanceof Variable) {
            valor.innerHTML = memoriaPrincipal[i].getValor()
        }
        else if (memoriaPrincipal[i] instanceof Etiqueta) {
            valor.innerHTML = memoriaPrincipal[i].getInstruccion()
        }
        else {
            valor.innerHTML = memoriaPrincipal[i]
        }







        row.appendChild(identificador)
        row.appendChild(valor)
        tbody.appendChild(row);
    }

    document.getElementById('tablaMemoria').appendChild(table);

}

function generarTablaProcesos() {
    document.getElementById('contenedorPrograma').innerHTML = "";

    let table = document.createElement('table');
    table.setAttribute("id", "tablasCodigo");
    let tbody = document.createElement('tbody');
    table.appendChild(tbody);

    for (var i = 0; i < procesos.length; i++) {
        let row = document.createElement('tr');

        let identificador = document.createElement('td');
        identificador.innerHTML = i
        let nombrePrograma = document.createElement('td');
        nombrePrograma.innerHTML = procesos[i].getNombrePrograma()
        let numeroInstrucciones = document.createElement('td');
        numeroInstrucciones.innerHTML = procesos[i].getNumeroInstrucciones()
        let rb = document.createElement('td');
        rb.innerHTML = procesos[i].getRb()
        let rlc = document.createElement('td');
        rlc.innerHTML = procesos[i].getRlc()
        let rlp = document.createElement('td');
        rlp.innerHTML = procesos[i].getRlp()

        row.appendChild(identificador)
        row.appendChild(nombrePrograma)
        row.appendChild(numeroInstrucciones)
        row.appendChild(rb)
        row.appendChild(rlc)
        row.appendChild(rlp)

        tbody.appendChild(row);
    }

    document.getElementById('contenedorPrograma').appendChild(table);

}

function generarTablaVariables() {
    contenedorVariables.innerHTML = "";

    let table = document.createElement('table');
    table.setAttribute("id", "tablasCodigo");

    let tbody = document.createElement('tbody');

    table.appendChild(tbody);

    for (var i = 0; i < memoriaPrincipal.length; i++) {

        if (memoriaPrincipal[i] instanceof Variable) {
            let row = document.createElement('tr');
            let identificador = document.createElement('td');
            identificador.innerHTML = i
            let valor = document.createElement('td');
            valor.innerHTML = memoriaPrincipal[i].getNombre()
            row.appendChild(identificador)
            row.appendChild(valor)
            tbody.appendChild(row);
        }

    }


    contenedorVariables.appendChild(table);

}

function generarTablaEtiquetas() {
    contenedorEtiquetas.innerHTML = "";

    let table = document.createElement('table');
    table.setAttribute("id", "tablasCodigo");

    let tbody = document.createElement('tbody');

    table.appendChild(tbody);

    for (var i = 0; i < memoriaPrincipal.length; i++) {

        if (memoriaPrincipal[i] instanceof Etiqueta) {
            let row = document.createElement('tr');
            let identificador = document.createElement('td');
            identificador.innerHTML = i
            let valor = document.createElement('td');
            valor.innerHTML = memoriaPrincipal[i].getNombre()
            row.appendChild(identificador)
            row.appendChild(valor)
            tbody.appendChild(row);
        }

    }


    contenedorEtiquetas.appendChild(table);

}
