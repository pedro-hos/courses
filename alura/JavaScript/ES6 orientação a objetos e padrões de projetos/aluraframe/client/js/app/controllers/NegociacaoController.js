class NegociacaoController {

  constructor() {

    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
    this._negociacaoService = new NegociacaoService();
    this._ordemAtual = '';

    this._negociacoesView = new NegociacoesView($('#negociacoesView'));

    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(),
      new NegociacoesView($('#negociacoesView')),
      'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

      this._mensagem = new Bind(
        new Mensagem(), new MensagemView($('#mensagemView')),
        'texto');

      }

      ordena(coluna) {

        if(this._ordemAtual == coluna) {
          this._listaNegociacoes.inverteOrdem();
        } else {
          this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }

        this._ordemAtual = coluna;

      }

      adiciona(event) {

        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        this._limpaFormulario();
      }

      importaNegociacoes() {

        Promise.all([
          this._negociacaoService.obterNegociacoesDaSemana(),
          this._negociacaoService.obterNegociacoesDaSemanaAnterior(),
          this._negociacaoService.obterNegociacoesDaSemanaRetrasada()
        ])
        .then(negociacoesPorPeriodo => {

          negociacoesPorPeriodo.reduce((grupoAtual, proximoGrupo) => {
            return grupoAtual.concat(proximoGrupo);
          })
          .forEach(negociacao => {
            this._listaNegociacoes.adiciona(
              new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor))
            });
          })
          .catch(erro => this._mensagem.texto = erro);

        }

        esvazia() {
          this._listaNegociacoes.esvazia();
          this._mensagem.texto = 'Negociações apagadas com sucesso';
        }

        _criaNegociacao() {

          return new Negociacao(DateHelper.textoParaData(this._inputData.value),
          this._inputQuantidade.value,
          this._inputValor.value);
        }

        _limpaFormulario() {

          this._inputData.value = '';
          this._inputQuantidade.value = 1;
          this._inputValor.value = 0;
          this._inputData.focus();
        }

      }
