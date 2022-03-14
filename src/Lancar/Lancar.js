import React, { Component } from "react"
import './Lancar.css'


class Lancar extends Component {


    constructor(props) {
        super(props)
        this.state = {
            entrada: '',
            orcamento: '',
            aprovado: '',
            cliente: '',
            os: '',
            nf: '',
            produto: '',
            status: 'orcamento',
            pendencia: false,
            garantia: false,
            obs: '',
            serverStatus: '',
            serverAddress: props.serverAddress
        }
    }

    handleGarantia = () => {
        if (this.state.garantia === false) {
            this.setState({ garantia: true })
        } else if (this.state.garantia === true) {
            this.setState({ garantia: false })
        }
    }


    onText = (event) => {
        if (event.target.id === 'fieldEntrada') {
            this.setState({ entrada: event.target.value })
        } else if (event.target.id === 'fieldCliente') {
            this.setState({ cliente: event.target.value })
        } else if (event.target.id === 'fieldOs') {
            this.setState({ os: event.target.value })
        } else if (event.target.id === 'fieldNf') {
            this.setState({ nf: event.target.value })
        } else if (event.target.id === 'fieldProduto') {
            this.setState({ produto: event.target.value })
        } else if (event.target.id === 'fieldObs') {
            this.setState({ obs: event.target.value })
        }
    }

    enviar = (event) => {
        const enviarData = {
            entrada: this.state.entrada,
            orcamento: this.state.orcamento,
            aprovado: this.state.aprovado,
            concluido: '',
            cliente: this.state.cliente,
            os: this.state.os,
            nf: this.state.nf,
            produto: this.state.produto,
            status: this.state.status,
            pendencia: this.state.pendencia,
            garantia: this.state.garantia,
            obs: this.state.obs
        }

        fetch(`${this.state.serverAddress}/postcard`,
            {
                method: "POST",
                body: JSON.stringify(enviarData),
                headers:
                    { "Content-Type": "application/json" },
            }).then((response) => response.json())
            .then((response) => {
                this.setState({ serverStatus: response })
            })
            .then(() => {
                this.setState({ cliente: '', os: '', nf: '', produto: '', obs: '', entrada: '' })
            })
    }

    retorna = () => {
        return this.setState({ serverStatus: '' })
    }

    render() {
        if (this.state.serverStatus === '') {
            return (
                <div className="tc ph0 ba bw0 shadow-5 br3 w-50 center backLancar">
                    <h2 className="">Criar novo trabalho</h2>
                    <div className="fontLancar">
                        <div className="">
                            <p className="mb1"><strong>Entrada:</strong></p>
                            <input id="fieldEntrada" className="mb1 br2 pa1" type='date' onChange={this.onText} value={this.state.entrada}></input>
                        </div>
                        <div className="">
                            <p className="mb1"><strong>Cliente:</strong></p>
                            <input id="fieldCliente" className="mb1 br2 pa1 w-50" type='text' onChange={this.onText} value={this.state.cliente}></input>
                        </div>
                        <div className="">
                            <p className="mb1"><strong>OS:</strong></p>
                            <input id="fieldOs" className="mb1 br2 pa1 w-50" type='text' onChange={this.onText} value={this.state.os}></input>
                        </div>
                        <div className="">
                            <p className="mb1"><strong>NF:</strong></p>
                            <input id="fieldNf" className="mb1 br2 pa1 w-50" type='text' onChange={this.onText} value={this.state.nf}></input>
                        </div>
                        <div className="">
                            <p className="mb1"><strong>Produto:</strong></p>
                            <input id="fieldProduto" className="mb1 br2 pa1 w-50" type='text' onChange={this.onText} value={this.state.produto}></input>
                        </div>
                        <div>
                            <p className="ma2"><strong>Garantia:</strong><input className="pl2 pointer v-mid checkbox" type='checkbox' checked={this.state.garantia} onChange={this.handleGarantia}></input></p>
                        </div>
                        <div className="">
                            <p className="mb1"><strong>Observações:</strong></p>
                            <textarea id="fieldObs" className="mb1 br2 pa1 w-100" type='text' onChange={this.onText} value={this.state.obs}></textarea>
                        </div>
                    </div>

                    <div>
                        <button className="mb2 fw9 black pv2 ph3 bg-light-gray ba b--gray hover-bg-gray hover-white" onClick={this.enviar}>Enviar</button>
                    </div>
                </div>
            )
        } else if (this.state.serverStatus === 'success') {
            return (
                <div className="tc ph0 ba bw0 shadow-5 br3 w-50 center backLancarSuccess vh-50 ma2">
                    <h1 className="pa2">Criado com sucesso</h1>
                    <button className="mb2 fw9 black pv2 ph3 bg-light-gray ba b--gray hover-bg-gray hover-white mt4" onClick={this.retorna}>Retorna</button>
                </div>
            )
        } else if (this.state.serverStatus === 'failed') {
            return (
                <div className="tc ph0 ba bw0 shadow-5 br3 w-50 center backLancarFailed vh-50 ma2 white">
                    <h1 className="pa2">Falha na criação</h1>
                    <button className="mb2 fw9 black pv2 ph3 bg-light-gray ba b--gray hover-bg-gray hover-white mt4" onClick={this.retorna}>Retorna</button>
                </div>
            )
        }
    }
}

export default Lancar