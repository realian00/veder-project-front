import React from "react";
import Card from "./Card/Card";
import './Components.css'

const Pendente = (props) => {
    const filteredDatabase = []
    props.database.map((item, i) => {
      if (item.status === 'pendente') {
        filteredDatabase.push(item)
      }
    })
  
    return (
      <div className="backComponents tc ph0 ba bw0 shadow-5 br3">
        <p className="ph1 tr ma1">{filteredDatabase.length}</p>
          <h1 className="tc ph0 center mt0">Pendente</h1>

        <ul className="list p10 ph0 ma3">
          {filteredDatabase.map((item, i) => (
            <li className="grow pointer" key={item._id}><Card id={item._id} key={item._id} cliente={item.cliente} os={item.os} nf={item.nf} entrada={item.entrada} orcamento={item.orcamento} aprovado={item.aprovado} status={item.status} produto={item.produto} obs={item.obs} pendencia={item.pendencia} onClick={props.click} /></li>
          ))}
        </ul>
      </div>
    )
  }
  
  export default Pendente