class Forca {

  #letrasChutadas;
  #vidas;
  #palavra;
  #palavraASerAdivinhada;
  #estado;

  constructor(palavraASerAdivinhada) {
    this.#palavraASerAdivinhada = palavraASerAdivinhada
    this.#letrasChutadas = []
    this.#vidas = 6
    this.#palavra = Array(palavraASerAdivinhada.length).fill('_')
    this.#estado = 'aguardando chute'
  }

  chutar(letra) {    

    if (letra.length > 1) {
      return;
    }

    if (this.#letraNaoFoiChutada(letra)) {

      this.#letrasChutadas.push(letra)

      if (this.#letraEstaErrada(letra)) {
        this.#vidas --

        if (this.#vidas === 0) {
          this.#estado = 'perdeu'      
        }
        return;
      }

      this.#preecherLetrasCorretas(letra)
      if (this.#acertouTudo() && this.#vidas > 0){
        this.#estado = 'ganhou'
      }
    }
  }

  buscarEstado() { return this.#estado; }

  buscarDadosDoJogo() {
      return {
          letrasChutadas: this.#letrasChutadas,
          vidas: this.#vidas,
          palavra: this.#palavra
      }
  }

  #letraNaoFoiChutada(letra) {
    return !this.#letrasChutadas.includes(letra)
  }

  #letraEstaErrada(letra) { 
    return !this.#palavraASerAdivinhada.includes(letra)
  }

  #preecherLetrasCorretas(letra) {
    const palavraAux = this.#palavraASerAdivinhada.split('')

    palavraAux.forEach((element, index) => {
      if (element === letra) {
        this.#palavra[index] = element
      }
    });
  }

  #acertouTudo() {
    return !this.#palavra.includes('_')
  }
}

module.exports = Forca;
