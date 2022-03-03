import React, { Component } from "react";
import ConcluidasCard from "./ConcluidasCard/ConcluidasCard";
import './Concluidas.css'


class Concluidas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inicio: '',
            final: ''
        }
    }

    handleInicio = (event) => {
        this.setState({ inicio: event.target.value})
    }

    handleFinal = (event) => {
        this.setState({ final: event.target.value})
    }


    render() {
        const partsInicio = this.state.inicio.split('-');
        const mydateInicio = new Date(partsInicio[0], partsInicio[1] - 1, partsInicio[2]);
        const hoursInicio = Math.floor(mydateInicio / (60 * 60 * 1000));

        const partsFinal = this.state.final.split('-');
        const mydateFinal = new Date(partsFinal[0], partsFinal[1] - 1, partsFinal[2]);
        const hoursFinal = Math.floor(mydateFinal / (60 * 60 * 1000));


        const filteredDatabase = []
        this.props.database.map((item, i) => {
            const partsConcluido = item.concluido.split('-');
            const mydateConcluido = new Date(partsConcluido[0], partsConcluido[1] - 1, partsConcluido[2]);
            const hoursConcluido = Math.floor(mydateConcluido / (60 * 60 * 1000));

            if (hoursConcluido >= hoursInicio && hoursConcluido <= hoursFinal) {
                filteredDatabase.push(item)
            }
        })
        return (
            <div className="flex flex-wrap backConcluidas ma1 br3 w-100">
                <div>
                <p className="mb1 ml2"><strong>Início:</strong></p>
                <input className="ma2 br2 pa1" type='date' onChange={this.handleInicio}></input>
                </div>
                <div>
                <p className="mb1 ml2"><strong>Final:</strong></p>
                <input className="ma2 br2 pa1" type='date' onChange={this.handleFinal}></input>
                </div>
                <div className="flex flex-wrap">
                   {filteredDatabase.map((item, i) => (
                    <div className="grow pointer" key={item._id} onClick={this.props.onClick}><ConcluidasCard id={item._id} key={item._id} cliente={item.cliente} os={item.os} nf={item.nf} entrada={item.entrada} orcamento={item.orcamento} aprovado={item.aprovado} concluido={item.concluido} status={item.status} produto={item.produto} obs={item.obs} /></div>
                ))} 
                </div>
                
            </div>
        )
    }
}

export default Concluidas