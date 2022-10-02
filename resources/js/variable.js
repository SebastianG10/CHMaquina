export default class Variable {


    constructor(nombre, tipo, valor=0) {
        this.nombre = nombre
        this.tipo = tipo
        this.valor = valor
    }

    getNombre() {
        return this.nombre;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
    getTipo() {
        return this.tipo
    }
    setTipo(tipo) {
        this.tipo = tipo
    }
    getValor() {
        return this.valor
    }
    setValor(valor) {
        this.valor = valor
    }

}

