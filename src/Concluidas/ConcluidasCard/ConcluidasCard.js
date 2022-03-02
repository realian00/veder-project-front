import React from "react";
import './ConcluidasCard.css'

const ConcluidasCard = (props) => {

    return (

        <div className={`fontCard tc ba br4 mb2 ma2 bg-light-green`} id={props.id}  >
            <p className="ma2" id={props.id}><strong>Cliente:</strong> {props.cliente}</p>
            <p className="ma2" id={props.id}><strong>OS:</strong> {props.os}</p>
            <p className="ma2" id={props.id}><strong>NF:</strong> {props.nf}</p>
            <p className="ma2" id={props.id}><strong>Concluído:</strong> {props.concluido.split('-').reverse().join('/')}</p>
            <p className="ma2" id={props.id}><strong>Produto:</strong> {props.produto}</p>
        </div>

    )


}


export default ConcluidasCard