export default class Etiqueta {


    constructor(nombre, valor, instruccion) {
        this.nombre = nombre
        this.valor = valor
        this.instruccion = instruccion
    }

    getNombre() {
        return this.nombre;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
    getValor() {
        return this.valor
    }
    setValor(valor) {
        this.valor = valor
    }
    getInstruccion(){
        return this.instruccion
    }
    setInstruccion(instruccion) {
        this.instruccion = instruccion
    }


}

