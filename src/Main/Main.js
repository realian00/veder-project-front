import React, { Component } from "react"
import Orcamento from "./Components/Orcamento";
import Pendente from "./Components/Pendente";
import Aprovado from "./Components/Aprovado";

import './Main.css'

class Main extends Component {

  render() {

    const dbOrcamento = this.props.finalDatabase
    dbOrcamento.sort(function (a, b) {
      a = a.entrada.split('-').join('');
      b = b.entrada.split('-').join('');
      return a.localeCompare(b);
    })

    const dbPendente = this.props.finalDatabase
    dbPendente.sort(function (a, b) {
      a = a.orcamento.split('-').join('');
      b = b.orcamento.split('-').join('');
      return a.localeCompare(b);
    })

    const dbAprovado = this.props.finalDatabase
    dbAprovado.sort(function (a, b) {
      a = a.aprovado.split('-').join('');
      b = b.aprovado.split('-').join('');
      return a.localeCompare(b);
    })

    return (
      
      <div className="w-100 center flex">
        <div className="w-third pa2">
          <Orcamento database={dbOrcamento} click={this.props.onClick} />
        </div>
        <div className="w-third pa2">
          <Pendente database={dbPendente} click={this.props.onClick} />
        </div>
        <div className="w-third pa2">
          <Aprovado database={dbAprovado} click={this.props.onClick} />
        </div>
      </div>
    )
  }
}
export default Main