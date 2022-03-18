import React from "react";

const Buttons = (props) => {
    if (props.selectedCard.status === 'orcamento') {
        return (
            <div className="tc ph0 ba bw0 br3 w-100 center">
                <div>
                    <button className="ma1 fw9 black pv2 ph3 bg-light-gray ba b--gray hover-bg-gray hover-white" onClick={props.chamaTelaCofirma}>Apagar</button>
                    <button className="ma1 fw9 black pv2 ph3 bg-light-gray ba b--gray hover-bg-gray hover-white" onClick={props.onClickAtualizar}>Atualizar</button>
                    <button className="ma1 fw9 black pv2 ph3 bg-light-gray ba b--gray hover-bg-gray hover-white" onClick={props.chamaOrcamento}>Orçamento</button>
                </div>
            </div>
        )
    } else if (props.selectedCard.status !== 'concluido') {
        return (
            <div className="tc ph0 ba bw0 br3 w-100 center">
                <div>
                    <button className="ma1 fw9 black pv2 ph3 bg-light-gray ba b--gray hover-bg-gray hover-white" onClick={props.chamaTelaCofirma}>Apagar</button>
                    <button className="ma1 fw9 black pv2 ph3 bg-light-gray ba b--gray hover-bg-gray hover-white" onClick={props.clickVerOrcamento}>Ver Orçamento</button>
                    <button className="ma1 fw9 black pv2 ph3 bg-light-gray ba b--gray hover-bg-gray hover-white" onClick={props.onClickAtualizar}>Atualizar</button>
                    <button className="ma1 fw9 black pv2 ph3 bg-light-gray ba b--gray hover-bg-gray hover-white" onClick={props.onClickEnviar}>Atualizar e Enviar</button>
                </div>
            </div>
        )
    } else if (props.selectedCard.status === 'concluido') {
        return (
            <div className="tc ph0 ba bw0 br3 w-100 center">
                <div>
                    <button className="ma1 fw9 black pv2 ph3 bg-light-gray ba b--gray hover-bg-gray hover-white" onClick={props.clickVerOrcamento}>Ver Orçamento</button>
                </div>
            </div>
        )
    }
}

export default Buttons