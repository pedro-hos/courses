class NegociacoesView extends View {

  template(model) {

    return `
      <table class="table table-hover table-bordered">
          <thead>
              <tr>
              <th onclick="negociacaoController.ordena('data')">DATA</th>
              <th onclick="negociacaoController.ordena('quantidade')">QUANTIDADE</th>
              <th onclick="negociacaoController.ordena('valor')">VALOR</th>
              <th onclick="negociacaoController.ordena('volume')">VOLUME</th>

              </tr>
          </thead>

          <tbody>
            ${model.negociacoes.map( m =>
              `<tr>
                <td>${DateHelper.dataParaTexto(m.data)}</td>
                <td>${m.quantidade}</td>
                <td>${m.valor}</td>
                <td>${m.volume}</td>
              </tr>`
            ).join("")}
          </tbody>

          <tfoot>
            <td colspan="3"></td>
            <td>
                ${model.volumeTotal}
            </td>
          </tfoot>
      </table>`;
  }

}
