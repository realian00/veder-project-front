import React from "react";
import Buttons from "../Buttons/Buttons";
import './Andamento.css'

const Andamento = (props) => {
    return (
        <div className="tc ph0 ba bw0 shadow-5 br3 w-50 center backSingleCard">
            <div className="fontSingleCard">
                <p className="ma2"><strong>ID:</strong> {props.selectedCard._id}</p>
                <p className="ma2"><strong>Cliente:</strong> {props.selectedCard.cliente}</p>
                <p className="ma2"><strong>OS:</strong> {props.selectedCard.os}</p>
                <p className="ma2"><strong>NF:</strong> {props.selectedCard.nf}</p>
                <p className="ma2"><strong>Entrada:</strong> {props.selectedCard.entrada.split('-').reverse().join('/')}</p>
                <p className="ma2"><strong>Orçamento:</strong> {props.selectedCard.orcamento.split('-').reverse().join('/')}</p>
                <p className="ma2"><strong>Aprovado:</strong> {props.selectedCard.aprovado.split('-').reverse().join('/')}</p>
                <p className="ma2"><strong>Concluído:</strong> {props.selectedCard.concluido.split('-').reverse().join('/')}</p>
                <p className="ma2"><strong>Produto:</strong> {props.selectedCard.produto}</p>
                <p className="ma2"><strong>Situação:</strong> {props.status}</p>
                <p className="ma2"><strong>Garantia:</strong><input className="pl2 pointer v-mid checkbox" type='checkbox' checked={props.selectedCard.garantia} onChange={props.handleWarranty}></input></p>
                <p className="ma2"><strong>Pendência ativa:</strong><input className="pl2 pointer v-mid checkbox" type='checkbox' checked={props.checked} onChange={props.handleCheckbox}></input></p>
                <p className="ma2"><strong>Observações:</strong></p>
                <textarea className="w-100 pa2 br2 mb2 vh-25" defaultValue={props.selectedCard.obs} onChange={props.handleUpdateObs}></textarea>
            </div>

            <div>
                <Buttons
                    selectedCard={props.selectedCard}
                    onClickAtualizar={props.onClickAtualizar}
                    onClickEnviar={props.onClickEnviar}
                    handleUpdateObs={props.handleUpdateObs}
                    chamaTelaCofirma={props.chamaTelaCofirma}
                    chamaOrcamento={props.chamaOrcamento}
                    clickVerOrcamento={props.clickVerOrcamento} 
                    >
                        
                </Buttons>
            </div>
        </div>
    )
}

export default Andamento