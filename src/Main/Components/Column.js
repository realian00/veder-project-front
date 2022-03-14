import React, { Component } from "react"
import Card from "./Card/Card";
import './Components.css'


class Column extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mounted: false,
      warrantyValue: 0
    }
  }

  componentDidMount() {
    window.requestAnimationFrame(() => this.setState({ mounted: true }))
  }

  render() {
    const filteredDatabase = []
    let value = 0
    this.props.database.map((item, i) => {
      if (item.status === this.props.status) {
        if (item.garantia === undefined) {
          item.garantia = false
        } else if (item.garantia === true) {
          value ++
        }
        filteredDatabase.push(item)
      }
    })

    return (
      <div className="backComponents tc ph0 ba bw0 shadow-5 br3">
        <p><span className="ph0 tl fl ma1">G={value}</span><span className="ph1 tr fr ma1">T={filteredDatabase.length}</span></p>
        <h1 className="tc ph0 center mt0">{this.props.name}</h1>
        <ul className={`App${this.state.mounted ? " enter" : ""} list p10 ph0 ma3`}>
          {filteredDatabase.map((item, i) => (
            <li className="grow pointer" key={item._id}><Card id={item._id} key={item._id} cliente={item.cliente} os={item.os} nf={item.nf} entrada={item.entrada} orcamento={item.orcamento} aprovado={item.aprovado} status={item.status} produto={item.produto} obs={item.obs} pendencia={item.pendencia} garantia={item.garantia} onClick={this.props.click} /></li>
          ))}
        </ul>
      </div>
    )
  }

}

export default Column