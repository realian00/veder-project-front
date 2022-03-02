import React from "react";
import './Card.css'

const Card = (props) => {

    let resultCss
    const actualhour = Math.floor(Date.now() / (60 * 60 * 1000));

    const partsEntrada = props.entrada.split('-');
    const mydateEntrada = new Date(partsEntrada[0], partsEntrada[1] - 1, partsEntrada[2]);
    const hoursEntrada = Math.floor(mydateEntrada / (60 * 60 * 1000));
    const hourResultEntrada = (actualhour - hoursEntrada) / 24

    const partsOrcamento = props.orcamento.split('-');
    const mydateOrcamento = new Date(partsOrcamento[0], partsOrcamento[1] - 1, partsOrcamento[2]);
    const hoursOrcamento = Math.floor(mydateOrcamento / (60 * 60 * 1000));
    const hourResultOrcamento = (actualhour - hoursOrcamento) / 24

    const partsAprovado = props.aprovado.split('-');
    const mydateAprovado = new Date(partsAprovado[0], partsAprovado[1] - 1, partsAprovado[2]);
    const hoursAprovado = Math.floor(mydateAprovado / (60 * 60 * 1000));
    const hourResultAprovado = (actualhour - hoursAprovado) / 24


    if (hourResultEntrada > 10 && props.status === 'orcamento') {
        resultCss = 'bg-light-red'
    } else if (hourResultOrcamento > 10 && props.status === 'pendente'){
        resultCss = 'bg-light-red'
    } else if (hourResultAprovado > 10 && props.status === 'aprovado'){
        resultCss = 'bg-light-red'
    } else {
        resultCss = 'bg-light-gray'
    }

    return (

        <div className={`fontCard tc ba br4 mb2 ${resultCss}`} id={props.id} onClick={props.onClick} >
            <p className="ma2" id={props.id}><strong>Cliente:</strong> {props.cliente}</p>
            <p className="ma2" id={props.id}><strong>OS:</strong> {props.os}</p>
            <p className="ma2" id={props.id}><strong>NF:</strong> {props.nf}</p>
            <p className="ma2" id={props.id}><strong>Entrada:</strong> {props.entrada.split('-').reverse().join('/')}</p>
            <p className="ma2" id={props.id}><strong>Orçamento:</strong> {props.orcamento.split('-').reverse().join('/')}</p>
            <p className="ma2" id={props.id}><strong>Aprovado:</strong> {props.aprovado.split('-').reverse().join('/')}</p>
            <p className="ma2" id={props.id}><strong>Produto:</strong> {props.produto}</p>
            <p className="ma2" id={props.id}><strong>Observação:</strong> {props.obs}</p>
        </div>
    )


}


export default Card