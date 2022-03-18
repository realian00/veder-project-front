import React, { Component } from "react"
import TextareaAutosize from 'react-textarea-autosize';
import './CriarOrcamento.css'


class CriarOrcamento extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: '',
            serie: '',
            corrosaoMetal: false,
            corrosaoPlaca: false,
            limpeza: false,
            descricao: '',

            item1: '',
            peca1: false,
            item2: '',
            peca2: false,
            item3: '',
            peca3: false,
            item4: '',
            peca4: false,
            item5: '',
            peca5: false,

            tempo: '',
            prazo: '',

            serverStatus: ''
        }
    }

    componentDidMount = () => {
        let parts = new Date().toISOString();
        const partsDate = parts.split('-')
        const realDate = (partsDate[2].slice(0, 2) + '-' + partsDate[1] + '-' + partsDate[0])
        this.setState({ date: realDate })
    }


    enviar = () => {
        const dataOrcamento = {
            cliente: this.props.selectedCard.cliente,
            os: this.props.selectedCard.os,
            date: this.state.date,
            modelo: this.props.selectedCard.produto,
            serie: this.state.serie,
            corrosaoMetal: this.state.corrosaoMetal,
            corrosaoPlaca: this.state.corrosaoPlaca,
            garantia: this.props.selectedCard.garantia,
            limpeza: this.state.limpeza,
            descricao: this.state.descricao,
            item1: this.state.item1,
            item2: this.state.item2,
            item3: this.state.item3,
            item4: this.state.item4,
            item5: this.state.item5,
            peca1: this.state.peca1,
            peca2: this.state.peca2,
            peca3: this.state.peca3,
            peca4: this.state.peca4,
            peca5: this.state.peca5,
            tempo: this.state.tempo,
            prazo: this.state.prazo,
            emitente: this.props.username
        }

        const fulldata = Object.assign({card: this.props.selectedCard, orcamento: dataOrcamento})

        fetch(`${this.props.serverAddress}/criarOrcamento`,
            {
                method: "POST",
                body: JSON.stringify(fulldata),
                headers:
                    { "Content-Type": "application/json" },
            }).then((response) => response.json())
            .then((response) => {
                if (response === 'success') {
                    this.setState({ serverStatus: response })
                }
            })
    }


    handleSerie = (event) => {
        this.setState({ serie: event.target.value })
    }

    handleDescricao = (event) => {
        this.setState({ descricao: event.target.value })
    }

    handleItem1 = (event) => {
        this.setState({ item1: event.target.value })
    }

    handleItem2 = (event) => {
        this.setState({ item2: event.target.value })
    }

    handleItem3 = (event) => {
        this.setState({ item3: event.target.value })
    }

    handleItem4 = (event) => {
        this.setState({ item4: event.target.value })
    }

    handleItem5 = (event) => {
        this.setState({ item5: event.target.value })
    }

    handleTempo = (event) => {
        this.setState({ tempo: event.target.value })
    }

    handlePrazo = (event) => {
        this.setState({ prazo: event.target.value })
    }






    toggleCorrosaoMetal() {
        this.setState(prevState => ({ corrosaoMetal: !prevState.corrosaoMetal }));
    }

    toggleCorrosaoPlaca() {
        this.setState(prevState => ({ corrosaoPlaca: !prevState.corrosaoPlaca }));
    }

    toggleLimpeza() {
        this.setState(prevState => ({ limpeza: !prevState.limpeza }));
    }

    togglePeca1() {
        this.setState(prevState => ({ peca1: !prevState.peca1 }));
    }

    togglePeca2() {
        this.setState(prevState => ({ peca2: !prevState.peca2 }));
    }

    togglePeca3() {
        this.setState(prevState => ({ peca3: !prevState.peca3 }));
    }

    togglePeca4() {
        this.setState(prevState => ({ peca4: !prevState.peca4 }));
    }

    togglePeca5() {
        this.setState(prevState => ({ peca5: !prevState.peca5 }));
    }


    render() {
        if (this.state.serverStatus === '') {
            return (
                <div className="center">
                    <h2 className="center tc">Orçamento de conserto</h2>

                    <div className="w-100 center flex">
                        <div className="w-third pa1 pt0 ba ma1">
                            <p className="fw6">Cliente:</p>
                            <input className="" value={this.props.selectedCard.cliente} readOnly={true} />
                        </div>
                        <div className="w-third pa1 pt0 ba ma1">
                            <p className="fw6">Ordem de serviço:</p>
                            <input className="" value={this.props.selectedCard.os} readOnly={true} />
                        </div>
                        <div className="w-third pa1 pt0 ba ma1">
                            <p className="fw6">Data:</p>
                            <input className="" value={this.state.date} readOnly={true} />
                        </div>
                    </div>

                    <div className="w-100 center flex">
                        <div className="w-two-thirds pa1 pt0 ba ma1">
                            <p className="fw6">Modelo:</p>
                            <TextareaAutosize className="w-75" value={this.props.selectedCard.produto} readOnly={true} />
                        </div>
                        <div className="w-two-thirds pa1 pt0 ba ma1">
                            <p className="fw6">Série:</p>
                            <input className="w-75" value={this.state.serie} onChange={this.handleSerie} />
                        </div>
                    </div>

                    <div className="w-100 center flex">
                        <div className="w-two-thirds pa1 pt0 ba ma1">
                            <p><label className="pointer">Corrosão partes metálicas:<input className="pl1 pointer v-mid checkbox ml" type='checkbox' checked={this.state.corrosaoMetal} onChange={this.toggleCorrosaoMetal.bind(this)} /></label></p>
                            <p><label className="pointer">Corrosão placas eletrônicas:<input className="pl1 pointer v-mid checkbox ml2" type='checkbox' checked={this.state.corrosaoPlaca} onChange={this.toggleCorrosaoPlaca.bind(this)} /></label></p>
                        </div>
                        <div className="w-two-thirds pa1 pt0 ba ma1">
                            <p><label className="">Em garantia:<input className="pl1 v-mid checkbox ml2" type='checkbox' checked={this.props.selectedCard.garantia} readOnly={true} /></label></p>
                            <p><label className="pointer">Limpeza:<input className="pl1 pointer v-mid checkbox ml2" type='checkbox' checked={this.state.limpeza} onChange={this.toggleLimpeza.bind(this)} /></label></p>
                        </div>
                    </div>

                    <div className="w-100 center flex">
                        <div className="w-100 pa1 pt0 ba ma1">
                            <p className="fw6">Descrição da Análise:</p>
                            <TextareaAutosize className="w-100" value={this.state.descricao} onChange={this.handleDescricao} />
                        </div>
                    </div>

                    <div className="w-100 center flex">
                        <div className="w-100 pa1 pt0 ba ma1">
                            <p className="fw6">Componentes avariados: <span className="tr fr">Pedir peça:</span></p>
                            <p><label className="fw6">Item 1:<input className="w-75 mr4" value={this.state.item1} onChange={this.handleItem1} /></label><span><input className="pl3 pointer v-mid checkbox" type='checkbox' checked={this.state.peca1} onChange={this.togglePeca1.bind(this)} /></span></p>
                            <p><label className="fw6">Item 2:<input className="w-75 mr4" value={this.state.item2} onChange={this.handleItem2} /></label><span><input className="pl3 pointer v-mid checkbox" type='checkbox' checked={this.state.peca2} onChange={this.togglePeca2.bind(this)} /></span></p>
                            <p><label className="fw6">Item 3:<input className="w-75 mr4" value={this.state.item3} onChange={this.handleItem3} /></label><span><input className="pl3 pointer v-mid checkbox" type='checkbox' checked={this.state.peca3} onChange={this.togglePeca3.bind(this)} /></span></p>
                            <p><label className="fw6">Item 4:<input className="w-75 mr4" value={this.state.item4} onChange={this.handleItem4} /></label><span><input className="pl3 pointer v-mid checkbox" type='checkbox' checked={this.state.peca4} onChange={this.togglePeca4.bind(this)} /></span></p>
                            <p><label className="fw6">Item 5:<input className="w-75 mr4" value={this.state.item5} onChange={this.handleItem5} /></label><span><input className="pl3 pointer v-mid checkbox" type='checkbox' checked={this.state.peca5} onChange={this.togglePeca5.bind(this)} /></span></p>
                        </div>
                    </div>

                    <div className="w-100 center flex">
                        <div className="w-third pa1 pt0 ba ma1">
                            <p className="fw6">Tempo de mão de obra:</p>
                            <input className="w-75" value={this.state.tempo} onChange={this.handleTempo} />
                        </div>
                        <div className="w-third pa1 pt0 ba ma1">
                            <p className="fw6">Prazo após aprovação:</p>
                            <input className="w-75" value={this.setState.prazo} onChange={this.handlePrazo} />
                        </div>
                        <div className="w-third pa1 pt0 ba ma1">
                            <p className="fw6">Emitente:</p>
                            <input className="" value={this.props.username} readOnly={true} style={{ textTransform: 'uppercase' }} />
                        </div>
                    </div>

                    <div>
                        <button className="ma1 fw9 black pv2 ph3 bg-light-gray ba b--gray hover-bg-gray hover-white" onClick={this.props.cancela}>Cancelar</button>
                        <button className="ma1 fw9 black pv2 ph3 bg-light-gray ba b--gray hover-bg-gray hover-white" onClick={this.enviar}>Enviar</button>
                    </div>
                </div>
            )
        } else if (this.state.serverStatus === 'success') {
            return (
                <div className="tc ph0 ba bw0 shadow-5 br3 w-50 center backLancarSuccess vh-50 ma2">
                    <h1 className="pa2">Enviado com sucesso</h1>
                    <button className="mb2 fw9 black pv2 ph3 bg-light-gray ba b--gray hover-bg-gray hover-white mt4" onClick={this.props.retorna}>Retorna</button>
                </div>
            )
        } else if (this.state.serverStatus === 'failed') {
            return (
                <div className="tc ph0 ba bw0 shadow-5 br3 w-50 center backLancarFailed vh-50 ma2 white">
                    <h1 className="pa2">Falha na criação</h1>
                    <button className="mb2 fw9 black pv2 ph3 bg-light-gray ba b--gray hover-bg-gray hover-white mt4" onClick={this.props.retorna}>Retorna</button>
                </div>
            )
        }

    }
}
export default CriarOrcamento