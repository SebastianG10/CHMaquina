export default class Programa {

    constructor(id, nombrePrograma, numeroInstrucciones, rb, rlc, rlp,lineasEliminadas) {
        this.id = id;
        this.nombrePrograma = nombrePrograma;
        this.numeroInstrucciones = numeroInstrucciones;
        this.rb = rb;
        this.rlc = rlc;
        this.rlp = rlp;
        this.lineasEliminadas = lineasEliminadas;
    }

    getId() { 
        return this.id; 
    }
    setId(id) {
        this.id = id;
    }
    getNombrePrograma(){
        return this.nombrePrograma;
    }
    setNombrePrograma(nombrePrograma) {
        this.nombrePrograma = nombrePrograma;
    }
    getNumeroInstrucciones(){
        return this.numeroInstrucciones;
    }
    setNumeroInstrucciones(numeroInstrucciones){
        this.numeroInstrucciones = numeroInstrucciones;
    }
    getRb(){
        return this.rb;
    }
    setRb(rb) {
        this.rb = rb;
    }
    getRlc(){
        return this.rlc;
    }
    setRlc(rlc){
        this.rlc = rlc;
    }
    getRlp(){
        return this.rlp;
    }
    setRlp(rlp){
        this.rlp = rlp;
    }
    getCodigo(){
        return this.codigo;
    }
    setCodigo(codigo){
        this.codigo = codigo;
    }
    getCodigoEjecutable(){
        return this.codigoEjecutable;
    }
    setCodigoEjecutable(codigoEjecutable){
        this.codigoEjecutable = codigoEjecutable;
    }
    getLineasEliminadas(){
        return this.lineasEliminadas
    }
    setLineasEliminadas(lineasEliminadas){
        this.lineasEliminadas = lineasEliminadas
    }

    

}