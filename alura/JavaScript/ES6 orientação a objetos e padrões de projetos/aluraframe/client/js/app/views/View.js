class View {

  constructor(elemento) {
    this.elemento = elemento;
  }

  template(model) {
    throw new Error('Você deve sobrescrever este método em seu template');
  }

  update(model) {
    this.elemento.innerHTML = this.template(model);
  }

}
