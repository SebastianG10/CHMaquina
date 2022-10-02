import Variable from './variable.js';
import Etiqueta from './etiqueta.js';

export default class Ejecutador {



    constructor() {
        this.acumulador = 0;
        this.palabrasClave = ["cargue", "almacene", "lea", "sume", "reste", "multiplique", "divida", "potencia", "modulo", "concatene", "elimine", "extraiga", "Y", "O", "NO", "muestre", "imprima", "retorne", "vaya", "vayasi"]
        this.codigo = []
        this.proceso = null

    }

    ejecutarPrograma(proceso, codigo) {
        this.codigo = codigo
        this.proceso = proceso

        let limite = proceso.getRlp() - proceso.getRlc()
        let longitudCodigo = codigo.length - limite
        let lineas = []

        for (var i = 0; i < longitudCodigo; i++) {
            lineas.push(codigo[i])
        }
        this.ejecutarLineas(0, lineas)
        //console.log("estoy aqui 2")
    }





    ejecutarLineas(i, lineas) {
        const pantallaPc = document.getElementById('contenedorPc')
        var h1 = document.createElement("h1");
        h1.id = "lineasCodigo"
        pantallaPc.appendChild(h1)


        //if (i < lineas.length) {

        for (var i = 0; i < lineas.length; i++) {

            if (lineas[i] instanceof Etiqueta) {
                document.getElementById('lineasCodigo').innerHTML = lineas[i].getInstruccion()
            }
            else {

                document.getElementById('lineasCodigo').innerHTML = lineas[i]

                console.log(lineas[i])


                let palabra = lineas[i].split(" ")


                switch (palabra[0]) {

                    case "cargue": this.cargue(lineas[i])
                        break;
                    case "almacene": this.almacene(lineas[i])
                        break;
                    case "lea": this.lea(lineas[i])
                        break;
                    case "sume": this.sume(lineas[i])
                        break;
                    case "reste": this.reste(lineas[i])
                        break;
                    case "multiplique": this.multipleque(lineas[i])
                        break;
                    case "divida": this.divida(lineas[i])
                        break;
                    case "potencia": this.potencia(lineas[i])
                        break;
                    case "modulo": this.modulo(lineas[i])
                        break;
                    case "muestre": this.muestre(lineas[i])
                        break;
                    case "concatene": this.concatene(lineas[i])
                        break;
                    case "elimine": this.elimine(lineas[i])
                        break;
                    case "extraiga": this.extraiga(lineas[i])
                        break;
                    case "Y": this.Y(lineas[i])
                        break;
                    case "O": this.O(lineas[i])
                        break;
                    case "NO": this.NO(lineas[i])
                        break;
                    case "vayasi":
                        let respuesta = this.vayasi(lineas[i])

                        if (respuesta != 0) {
                            i = respuesta - 1
                        }
                        break;
                    case "retorne": i = lineas.length
                        break;

                }
            }
            
        }

    }

   

    /*
    * Descripcion: Cárguese/copie en el acumulador el valor almacenado en la variable indicada por el operando.
    * 
    */
    cargue(linea) {
        const pantallaPc = document.getElementById('contenedorAcumuladora')
        var h1 = document.createElement("h1");
        h1.id = "valorAcumuladora"
        pantallaPc.appendChild(h1);


        let palabra = linea.split(" ")
        for (var i = 0; i < this.codigo.length; i++) {
            if (this.codigo[i] instanceof Variable) {
                if (palabra[1] == this.codigo[i].getNombre()) {
                    this.acumulador = this.codigo[i].getValor()
                    document.getElementById('valorAcumuladora').innerHTML = "Acumulador: " + this.codigo[i].getValor()
                    break
                }
            }
        }
    }

    /*
    * Descripcion: Guarde/copie el valor que hay en el Acumulador en la posición de memoria que corresponda
    * a la variable indicada por el operando.
    * 
    */
    almacene(linea) {

        let palabra = linea.split(" ")
        for (var i = 0; i < this.codigo.length; i++) {
            if (this.codigo[i] instanceof Variable) {
                if (palabra[1] == this.codigo[i].getNombre()) {
                    this.codigo[i].setValor(this.acumulador)
                    break
                }
            }
        }

    }
    /*
    * Descripcion: Lee por teclado/pantalla el valor a ser asignado a la variable indicado por la variable
    * referida en el operando.
    * 
    */
    lea(linea) {
        let variableNueva = prompt("Digite el valor")
        console.log(variableNueva)

        let palabra = linea.split(" ")
        for (var i = 0; i < this.codigo.length; i++) {
            if (this.codigo[i] instanceof Variable) {
                if (palabra[1] == this.codigo[i].getNombre()) {
                    this.codigo[i].setValor(variableNueva)
                    this.acumulador = variableNueva
                    break
                }
            }
        }
    }
    /*
    * Descripcion: Incremente/sume al valor del acumulador el valor indicado por la variable señalada por el
    * operando.
    */
    sume(linea) {

        let palabra = linea.split(" ")
        for (var i = 0; i < this.codigo.length; i++) {
            if (this.codigo[i] instanceof Variable) {
                if (palabra[1] == this.codigo[i].getNombre()) {
                    this.acumulador = parseInt(this.acumulador) + parseInt(this.codigo[i].getValor())
                    document.getElementById('valorAcumuladora').innerHTML = "Acumulador: " + this.acumulador
                    break
                }
            }
        }

    }
    /*
    * Descripcion: Decremente/reste del valor del acumulador el valor indicado por la variable que señala el
    * operando.
    */
    reste(linea) {

        let palabra = linea.split(" ")
        for (var i = 0; i < this.codigo.length; i++) {
            if (this.codigo[i] instanceof Variable) {
                if (palabra[1] == this.codigo[i].getNombre()) {
                    this.acumulador = parseInt(this.acumulador) - parseInt(this.codigo[i].getValor())
                    document.getElementById('valorAcumuladora').innerHTML = "Acumulador: " + this.acumulador
                    break
                }
            }
        }


    }
    /*
    * Descripcion: Multiplique el valor del acumulador por el valor indicado por la variable señalada por el
    * operando.
    */
    multipleque(linea) {
        let palabra = linea.split(" ")
        for (var i = 0; i < this.codigo.length; i++) {
            if (this.codigo[i] instanceof Variable) {
                if (palabra[1] == this.codigo[i].getNombre()) {
                    this.acumulador = parseInt(this.acumulador) * parseInt(this.codigo[i].getValor())
                    document.getElementById('valorAcumuladora').innerHTML = "Acumulador: " + this.acumulador
                    break
                }
            }
        }
    }
    /*
    * Descripcion: Divida el valor del acumulador por el valor indicado por la variable señalada por el 
    * operando. El divisor deberá ser una cantidad diferente de cero.
    * 
    */
    divida(linea) {
        let palabra = linea.split(" ")
        for (var i = 0; i < this.codigo.length; i++) {
            if (this.codigo[i] instanceof Variable) {
                if (palabra[1] == this.codigo[i].getNombre()) {
                    this.acumulador = parseInt(this.acumulador) / parseInt(this.codigo[i].getValor())
                    document.getElementById('valorAcumuladora').innerHTML = "Acumulador: " + this.acumulador
                    break
                }
            }
        }
    }
    /*
    * Descripcion: Eleve el acumulador a la potencia señalada por el operando (los exponentes pueden ser
    * valores enteros, positivos o negativos)
    * 
    */
    potencia(linea) {
        let palabra = linea.split(" ")
        for (var i = 0; i < this.codigo.length; i++) {
            if (this.codigo[i] instanceof Variable) {
                if (palabra[1] == this.codigo[i].getNombre()) {
                    this.acumulador = Math.pow(parseInt(this.acumulador), parseInt(this.codigo[i].getValor()))
                    document.getElementById('valorAcumuladora').innerHTML = "Acumulador: " + this.acumulador
                    break
                }
            }
        }
    }
    /*
    * Descripcion: Obtenga el modulo al dividir el valor del acumulador por el valor indicado por la variable
    * señalada por el operando.
    * 
    */
    modulo(linea) {
        let palabra = linea.split(" ")
        for (var i = 0; i < this.codigo.length; i++) {
            if (this.codigo[i] instanceof Variable) {
                if (palabra[1] == this.codigo[i].getNombre()) {
                    this.acumulador = parseInt(this.acumulador) % parseInt(this.codigo[i].getValor())
                    document.getElementById('valorAcumuladora').innerHTML = "Acumulador: " + this.acumulador
                    break
                }
            }
        }

    }
    /*
    * Descripcion: Genera una cadena  dada por el operando a la cadena que hay en el
    * acumulador (Operando alfanumérico). El contenido del acumulador deberá tratarse como
    * cadena en caso de ser numérico.
    * 
    */
    concatene(linea) {
        let palabra = linea.split(" ")
        for (var i = 0; i < this.codigo.length; i++) {
            if (this.codigo[i] instanceof Variable) {
                if (palabra[1] == this.codigo[i].getNombre()) {
                    this.acumulador = String(this.acumulador) + " " + String(this.codigo[i].getValor())
                    document.getElementById('valorAcumuladora').innerHTML = "Acumulador: " + this.acumulador
                    break
                }
            }
        }


    }
    /*
    * Descripcion: Genere una subcadena que elimine cualquier aparición del conjunto de caracteres dados por
    * el operando de la cadena que se encuentra en el acumulador (operando alfanumérico).
    * 
    */
    elimine(linea) {
        let palabra = linea.split(" ")
        for (var i = 0; i < this.codigo.length; i++) {
            if (this.codigo[i] instanceof Variable) {
                if (palabra[1] == this.codigo[i].getNombre()) {

                    let re = new RegExp(String(this.codigo[i].getValor()), 'g');
                    this.acumulador = this.acumulador.replace(re, ' ')
                    this.acumulador = this.acumulador.trim()
                    this.acumulador = this.acumulador.replace(/\s+/g, " ")
                    document.getElementById('valorAcumuladora').innerHTML = "Acumulador: " + this.acumulador
                    break
                }
            }
        }
    }
    /*
    * Descripcion: Genere una subcadena que extraiga los primeros caracteres (dados por el operando con valor
    * numérico) de la cadena que se encuentra en el acumulador.
    * 
    */
    extraiga(linea) {
        let palabra = linea.split(" ")
        this.acumulador = this.acumulador.substring(0, parseInt(palabra[1]))
        document.getElementById('valorAcumuladora').innerHTML = "Acumulador: " + this.acumulador
    }
    /*
    * Descripcion: Produce una operación lógica Y (AND) entre el primer operando y el segundo operando que
    * son variables lógicas y la almacena en el tercer operando.
    * 
    */
    Y(linea) {
        let palabra = linea.split(" ")
        let operando1 = -1;
        let operando2 = -1;

        for (var i = 0; i < this.codigo.length; i++) {
            if (this.codigo[i] instanceof Variable) {

                if (palabra[1] == this.codigo[i].getNombre()) {
                    operando1 = this.codigo[i].getValor()
                }
                if (palabra[2] == this.codigo[i].getNombre()) {
                    operando2 = this.codigo[i].getValor()
                }
                if (operando1 != -1 && operando2 != -1) {
                    if (palabra[3] == this.codigo[i].getNombre()) {
                        let resultado = operando1 && operando2
                        this.codigo[i].setValor(resultado)
                        break;
                    }
                }
            }
        }

    }
    /*
    * Descripcion: Produce una operación lógica O (OR) entre el primer operando y el segundo operando que
    * son variables lógicas y la almacena en la variable del tercer operando.
    * 
    */
    O(linea) {
        let palabra = linea.split(" ")
        let operando1 = -1;
        let operando2 = -1;

        for (var i = 0; i < this.codigo.length; i++) {
            if (this.codigo[i] instanceof Variable) {

                if (palabra[1] == this.codigo[i].getNombre()) {
                    operando1 = this.codigo[i].getValor()
                }
                if (palabra[2] == this.codigo[i].getNombre()) {
                    operando2 = this.codigo[i].getValor()
                }
                if (operando1 != -1 && operando2 != -1) {
                    if (palabra[3] == this.codigo[i].getNombre()) {
                        let resultado = operando1 || operando2
                        this.codigo[i].setValor(resultado)
                        break;
                    }
                }
            }
        }

    }
    /*
    * Descripcion: Produce una operación de negación lógica para el primer operando que es una variable lógica
    * y el resultado se almacena en la variable del segundo operando.
    * 
    */
    NO(linea) {
        let palabra = linea.split(" ")
        let operando1 = -1;

        for (var i = 0; i < this.codigo.length; i++) {
            if (this.codigo[i] instanceof Variable) {

                if (palabra[1] == this.codigo[i].getNombre()) {
                    operando1 = this.codigo[i].getValor()
                }

                if (operando1 != -1) {
                    if (palabra[2] == this.codigo[i].getNombre()) {
                        let resultado = !operando1

                        if (resultado == false) {
                            resultado = 0
                        }
                        if (resultado == true) {
                            resultado = 1
                        }
                        this.codigo[i].setValor(resultado)
                        break;
                    }
                }
            }
        }
    }
    /*
    * Descripcion: Presente por pantalla el valor que hay en la variable indicada por el operando, si el operando
    * es acumulador muestre el valor del acumulador.
    * 
    */
    muestre(linea) {
        document.getElementById('contenedorPantalla').innerHTML = "";
        let palabra = linea.split(" ")
        for (var i = 0; i < this.codigo.length; i++) {
            if (this.codigo[i] instanceof Variable) {

                const pantalla = document.getElementById('contenedorPantalla')
                const h1 = document.createElement("h1");

                if (palabra[1] == "acumulador") {
                    h1.textContent = "Resultado: " + this.acumulador
                    pantalla.appendChild(h1);
                    break
                }
                if (palabra[1] == this.codigo[i].getNombre()) {
                    h1.textContent = "Resultado: " + this.codigo[i].getValor()
                    pantalla.appendChild(h1);
                    break
                }

            }
        }

    }

    /*
    * Descripcion: Salte a la instrucción que corresponde a la etiqueta indicada por el operando y siga la
    * ejecución a partir de allí.
    * 
    */
    vaya(linea) {

    }
    /*
    * Descripcion: Si el valor del acumulador es mayor a cero salte a la instrucción que corresponde a la 
    * etiqueta indicada por el primer operando y continue la ejecución a partir de allí. Si el valor del 
    * acumulador es menor a cero salte a la instrucción que corresponde a la etiqueta indicada por el segundo 
    * operando y continue la ejecución a partir de allí.o Si el acumulador es cero salte a la siguiente 
    * instrucción adyacente a la instrucción vayasi y siga la ejecución a partir de allí.
    */
    vayasi(linea) {
        let palabra = linea.split(" ")

        if (this.acumulador == 0) {
            return 0
        }
        if (this.acumulador > 0) {
            for (let i = 0; i < this.codigo.length; i++) {
                if (this.codigo[i] instanceof Etiqueta) {
                    if (this.codigo[i].getNombre() == palabra[1]) {
                        return (this.codigo[i].getValor() - 1) - this.proceso.getLineasEliminadas()
                    }
                }
            }
        }
        if (this.acumulador < 0) {
            for (let i = 0; i < this.codigo.length; i++) {
                if (this.codigo[i] instanceof Etiqueta) {
                    if (this.codigo[i].getNombre() == palabra[2]) {
                        return this.codigo[i].getValor() - this.proceso.getLineasEliminadas()
                    }
                }
            }
        }


    }






}