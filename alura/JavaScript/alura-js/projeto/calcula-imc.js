var trPacientes = document.getElementsByClassName("paciente"); //Array de trs

function montaPaciente(pacienteTr){
    var tdNome = pacienteTr.getElementsByClassName("info-nome")[0];
    var tdPeso = pacienteTr.getElementsByClassName("info-peso")[0];
    var tdAltura = pacienteTr.getElementsByClassName("info-altura")[0];

    var paciente = {
        nome : tdNome.textContent,
        peso : tdPeso.textContent,
        altura : tdAltura.textContent,
        pegaImc: function() {

            if(this.altura != 0){
                var imc = this.peso / (this.altura * this.altura);
                return imc;
            } else{

                console("Não posso dividir por zero!");
            }
        }
    }
    return paciente;
}

function calculaImc() {

  if(this.altura != 0) {
    return this.peso / (this.altura * this.altura);

  } else{
    console.log("Não posso executar uma divisão por 0!");
  }

}

function percorreArray(array, comportamento) {
  for(var posicaoAtual = 0; posicaoAtual <= array.length - 1; posicaoAtual++) {
    comportamento(array[posicaoAtual]);
  }
}



var botao = document.getElementById("calcula-imcs");
botao.addEventListener("click", function(){
    percorreArray(trPacientes, function(pacienteTr){
    var paciente = montaPaciente(pacienteTr);
    var tdImc = pacienteTr.getElementsByClassName("info-imc")[0].textContent = paciente.pegaImc();
  });
});
