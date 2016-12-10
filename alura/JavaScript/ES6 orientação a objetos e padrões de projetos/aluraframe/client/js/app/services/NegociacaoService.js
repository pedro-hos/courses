class NegociacaoService {

  obterNegociacoesDaSemana(cb) {

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'negociacoes/semana');
    xhr.onreadystatechange = () => {
      if(xhr.readyState == 4) {
        if(xhr.status == 200) {
          let negociacoes =
          JSON.parse(xhr.responseText)
          .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor));

          cb(null, negociacoes);

        } else {
          console.log(xhr.responseText);
          cb('Não foi possível obter as negociações da semana', null);
        }
      }
    }

    xhr.send();
  }
}
