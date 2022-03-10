import React, { Component } from "react"
import './SingleCard.css'

class SingleCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            telaConfirma: 'none',
            status: this.props.selectedCard.status,

            mounted: false
        }
    }


    chamaTelaCofirma = () => {
        this.setState({ telaConfirma: 'apagar' })
    }

    cancela = () => {
        this.setState({ telaConfirma: 'none' })
    }

    componentDidMount() {
        window.requestAnimationFrame(() => this.setState({ mounted: true }))
        if (this.props.selectedCard.status === 'orcamento') {
            this.setState({ status: 'Aguardando orçamento' })
        } else if (this.props.selectedCard.status === 'pendente') {
            this.setState({ status: 'Aguardando aprovação' })
        } else if (this.props.selectedCard.status === 'aprovado'){
            this.setState({ status: 'Aguardando conclusão' })
        } else if (this.props.selectedCard.status === 'concluido'){
            this.setState({ status: 'Concluído' })
        }
    }


        render() {
            if (this.state.telaConfirma === 'none') {
                if (this.props.selectedCard.status !== 'concluido') {
                    return (
                        <div className="tc ph0 ba bw0 shadow-5 br3 w-50 center backSingleCard">
                            <div className="fontSingleCard">
                                <p className="ma2"><strong>ID:</strong> {this.props.selectedCard._id}</p>
                                <p className="ma2"><strong>Cliente:</strong> {this.props.selectedCard.cliente}</p>
                                <p className="ma2"><strong>OS:</strong> {this.props.selectedCard.os}</p>
                                <p className="ma2"><strong>NF:</strong> {this.props.selectedCard.nf}</p>
                                <p className="ma2"><strong>Entrada:</strong> {this.props.selectedCard.entrada.split('-').reverse().join('/')}</p>
                                <p className="ma2"><strong>Orçamento:</strong> {this.props.selectedCard.orcamento.split('-').reverse().join('/')}</p>
                                <p className="ma2"><strong>Aprovado:</strong> {this.props.selectedCard.aprovado.split('-').reverse().join('/')}</p>
                                <p className="ma2"><strong>Concluído:</strong> {this.props.selectedCard.concluido.split('-').reverse().join('/')}</p>
                                <p className="ma2"><strong>Produto:</strong> {this.props.selectedCard.produto}</p>
                                <p className="ma2"><strong>Situação:</strong> {this.state.status}</p>
                                <p className="ma2"><strong>Pendência ativa:</strong><input className="pl2 pointer v-mid checkbox" type='checkbox' checked={this.props.checked} onChange={this.props.handleCheckbox}></input></p>
                                <p className="ma2" ><strong>Observações:</strong></p>
                                <textarea className="w-100 pa2 br2 mb2 vh-25" defaultValue={this.props.selectedCard.obs} onChange={this.props.handleUpdateObs}></textarea>
                            </div>


                            <div>
                                <button className="ma1 fw9 black pv2 ph3 bg-light-gray ba b--gray hover-bg-gray hover-white" onClick={this.chamaTelaCofirma}>Apagar</button>
                                <button className="ma1 fw9 black pv2 ph3 bg-light-gray ba b--gray hover-bg-gray hover-white" onClick={this.props.onClickAtualizar}>Atualizar</button>
                                <button className="ma1 fw9 black pv2 ph3 bg-light-gray ba b--gray hover-bg-gray hover-white" onClick={this.props.onClickEnviar}>Atualizar e Enviar</button>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className="tc ph0 ba bw0 shadow-5 br3 w-50 center backSingleCard">
                            <div className="fontSingleCard">
                                <p className="ma2"><strong>ID:</strong> {this.props.selectedCard._id}</p>
                                <p className="ma2"><strong>Cliente:</strong> {this.props.selectedCard.cliente}</p>
                                <p className="ma2"><strong>OS:</strong> {this.props.selectedCard.os}</p>
                                <p className="ma2"><strong>NF:</strong> {this.props.selectedCard.nf}</p>
                                <p className="ma2"><strong>Entrada:</strong> {this.props.selectedCard.entrada.split('-').reverse().join('/')}</p>
                                <p className="ma2"><strong>Orçamento:</strong> {this.props.selectedCard.orcamento.split('-').reverse().join('/')}</p>
                                <p className="ma2"><strong>Aprovado:</strong> {this.props.selectedCard.aprovado.split('-').reverse().join('/')}</p>
                                <p className="ma2"><strong>Concluído:</strong> {this.props.selectedCard.concluido.split('-').reverse().join('/')}</p>
                                <p className="ma2"><strong>Produto:</strong> {this.props.selectedCard.produto}</p>
                                <p className="ma2"><strong>Situação:</strong> {this.state.status}</p>
                                <p className="ma2" ><strong>Observações:</strong></p>
                                <textarea className="w-100 pa2 br2 mb2 vh-25" defaultValue={this.props.selectedCard.obs} onChange={this.props.handleUpdateObs}></textarea>
                            </div>
                        </div>
                    )
                }


            } else if (this.state.telaConfirma === 'apagar') {
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
            }
        }
    }


export default SingleCard