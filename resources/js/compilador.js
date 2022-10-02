export default class Compilador {


    constructor() {
        this.palabrasClave = ["cargue", "almacene", "nueva", "lea", "sume", "reste", "multiplique", "divida", "potencia", "modulo", "concatene", "elimine", "extraiga", "Y", "O", "NO", "muestre", "imprima", "retorne", "vaya", "vayasi", "etiqueta"]

    }

    compilarCodigo(codigo) {
        var respuesta = this.formatearCodigo(codigo)

        let codigoFormateado = respuesta[0]
        let lineasEliminadas = respuesta[1]

        if (this.verificarKeyword(codigoFormateado)) {
            return [codigoFormateado,lineasEliminadas]
        }

    }

    formatearCodigo(codigo) {

        var lineas = codigo.split('\n');
        var lineasFormateadas = []
        var lineasEliminadas = 0

        for (var i = 0; i < lineas.length; i++) {
            if (lineas[i] != "" && !lineas[i].includes("//")) {
                
                lineas[i] = lineas[i].trim()
                lineas[i] = lineas[i].replace(/\s+/g, " ")
                lineasFormateadas.push(lineas[i])
            }else{
                lineasEliminadas += 1
            }
        }

        return [lineasFormateadas,lineasEliminadas]
    }

    verificarKeyword(lineas) {

        var lineasCorrectas = 0

        for (var i = 0; i < lineas.length; i++) {
            var contadorError = 0

            var palabras = lineas[i].split(' ')
            for (var j = 0; j < this.palabrasClave.length; j++) {

                if (this.palabrasClave[j] == palabras[0]) {
                    lineasCorrectas = lineasCorrectas + 1
                    break;
                }
                else {
                    contadorError = contadorError + 1
                }

            }
            if (contadorError == this.palabrasClave.length) {
                const pantalla = document.getElementById('contenedorPantalla')
                const h1 = document.createElement("h1");

                h1.textContent = "Error en la linea: " + i + " " + lineas[i]
                pantalla.appendChild(h1);


            }
        }

        if (lineasCorrectas == lineas.length) {
            return true
        }
        else {
            return false
        }

    }







}

