import React, { Component } from "react"
import Andamento from "./Andamento/Andamento"
import Concluido from "./Concluido/Concluido"
import CriarOrcamento from "./CriarOrcamento/CriarOrcamento"
import './SingleCardDisplay.css'

class SingleCardDisplay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentWindow: 'none',
            status: this.props.selectedCard.status,
            mounted: false
        }
    }


    chamaTelaCofirma = () => {
        this.setState({ currentWindow: 'apagar' })
    }

    chamaOrcamento = () => {
        this.setState({ currentWindow: 'orcamento' })
    }

    cancela = () => {
        this.setState({ currentWindow: 'none' })
    }

    componentDidMount() {
        window.requestAnimationFrame(() => this.setState({ mounted: true }))
        if (this.props.selectedCard.status === 'orcamento') {
            this.setState({ status: 'Aguardando orçamento' })
        } else if (this.props.selectedCard.status === 'pendente') {
            this.setState({ status: 'Aguardando aprovação' })
        } else if (this.props.selectedCard.status === 'aprovado') {
            this.setState({ status: 'Aguardando conclusão' })
        } else if (this.props.selectedCard.status === 'concluido') {
            this.setState({ status: 'Concluído' })
        }
    }


    render() {
        if (this.state.currentWindow === 'none') {
            if (this.props.selectedCard.status !== 'concluido') {
                return (
                    <Andamento
                        selectedCard={this.props.selectedCard}
                        status={this.state.status}
                        checked={this.props.checked}
                        handleWarranty={this.props.handleWarranty}
                        handleCheckbox={this.props.handleCheckbox}
                        onClickAtualizar={this.props.onClickAtualizar}
                        onClickEnviar={this.props.onClickEnviar}
                        handleUpdateObs={this.props.handleUpdateObs}
                        chamaTelaCofirma={this.chamaTelaCofirma}
                        chamaOrcamento={this.chamaOrcamento}
                        clickVerOrcamento={this.props.clickVerOrcamento} 
                    />
                )
            } else {
                return (
                    <Concluido
                    selectedCard={this.props.selectedCard}
                    status={this.state.status}
                    checked={this.props.checked}
                    handleWarranty={this.props.handleWarranty}
                    handleCheckbox={this.props.handleCheckbox}
                    onClickAtualizar={this.props.onClickAtualizar}
                    onClickEnviar={this.props.onClickEnviar}
                    handleUpdateObs={this.props.handleUpdateObs}
                    chamaTelaCofirma={this.chamaTelaCofirma}
                />
                )
            }


        } else if (this.state.currentWindow === 'apagar') {
            return (
                <div className="tc ba br4 ma4 w-50 center backSingleCard">
                    <p><strong>Esta ação é irreversível!</strong></p>
                    <p>Confirma exclusão?</p>

                    <div>
                        <button className="ma1 fw9 black pv2 ph3 bg-light-gray ba b--gray hover-bg-gray hover-white" onClick={this.props.onClickApagar}>Confirma</button>
                        <button className="ma1 fw9 black pv2 ph3 bg-light-gray ba b--gray hover-bg-gray hover-white" onClick={this.cancela}>Cancela</button>
                    </div>

                </div>
            )
        } else if (this.state.currentWindow === 'orcamento') {
            return (
                <CriarOrcamento 
                selectedCard={this.props.selectedCard}
                username={this.props.username}
                cancela={this.cancela}
                serverAddress={this.props.serverAddress}
                retorna={this.props.retorna}
                enviarFinal={this.props.enviarFinal}
                />
            )
        }
    }
}


export default SingleCardDisplay