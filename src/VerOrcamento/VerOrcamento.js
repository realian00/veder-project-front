import React, { Component } from "react"
import TextareaAutosize from 'react-textarea-autosize';
import './VerOrcamento.css'


class VerOrcamento extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: ''
        }
    }

    componentDidMount = () => {
        this.enviar()
    }


    enviar = () => {

        fetch(`${this.props.serverAddress}/verOrcamento`,
            {
                method: "POST",
                body: JSON.stringify(this.props.singleCardData),
                headers:
                    { "Content-Type": "application/json" },
            }).then((response) => response.json())
            .then((response) => {
                    this.setState({ data: response })
            }
            )
    }




    render() {
        const {cliente, os, date, modelo, serie, emitente, corrosaoMetal, corrosaoPlaca, garantia, limpeza, descricao, item1, item2, item3, item4, item5, peca1, peca2, peca3, peca4, peca5, tempo, prazo} = this.state.data
        
        return (
            <div className="center">
                <h2 className="center tc">Orçamento de conserto</h2>

                <div className="w-100 center flex">
                    <div className="w-third pa1 pt0 ba ma1">
                        <p className="fw6">Cliente:</p>
                        <input className="noborder" value={cliente} readOnly={true} />
                    </div>
                    <div className="w-third pa1 pt0 ba ma1">
                        <p className="fw6">Ordem de serviço:</p>
                        <input className="noborder" value={os} readOnly={true} />
                    </div>
                    <div className="w-third pa1 pt0 ba ma1">
                        <p className="fw6">Data:</p>
                        <input className="noborder" value={date} readOnly={true} />
                    </div>
                </div>

                <div className="w-100 center flex">
                    <div className="w-two-thirds pa1 pt0 ba ma1">
                        <p className="fw6">Modelo:</p>
                        <input className="w-75 noborder" value={modelo} readOnly={true} />
                    </div>
                    <div className="w-two-thirds pa1 pt0 ba ma1">
                        <p className="fw6">Série:</p>
                        <input className="w-75 noborder" value={serie} readOnly={true} />
                    </div>
                </div>

                <div className="w-100 center flex">
                    <div className="w-two-thirds pa1 pt0 ba ma1">
                        <p><label className="pointer">Corrosão partes metálicas:<input className="pl1 pointer v-mid checkbox ml" type='checkbox' checked={corrosaoMetal} readOnly={true} /></label></p>
                        <p><label className="pointer">Corrosão placas eletrônicas:<input className="pl1 pointer v-mid checkbox ml2" type='checkbox' checked={corrosaoPlaca} readOnly={true} /></label></p>
                    </div>
                    <div className="w-two-thirds pa1 pt0 ba ma1">
                        <p><label className="">Em garantia:<input className="pl1 v-mid checkbox ml2" type='checkbox' checked={garantia} readOnly={true} /></label></p>
                        <p><label className="pointer">Limpeza:<input className="pl1 pointer v-mid checkbox ml2" type='checkbox' checked={limpeza} readOnly={true} /></label></p>
                    </div>
                </div>

                <div className="w-100 center flex">
                    <div className="w-100 pa1 pt0 ba ma1">
                        <p className="fw6">Descrição da Análise:</p>
                        <TextareaAutosize className="w-100 noborder" value={descricao} readOnly={true} />
                    </div>
                </div>

                <div className="w-100 center flex">
                    <div className="w-100 pa1 pt0 ba ma1">
                        <p className="fw6">Componentes avariados: <span className="tr fr">Pedir peça:</span></p>
                        <p><label className="fw6">Item 1:<input className="w-75 mr4" value={item1} readOnly={true} /></label><span><input className="pl3 pointer v-mid checkbox" type='checkbox' checked={peca1} readOnly={true} /></span></p>
                        <p><label className="fw6">Item 2:<input className="w-75 mr4" value={item2} readOnly={true} /></label><span><input className="pl3 pointer v-mid checkbox" type='checkbox' checked={peca2} readOnly={true} /></span></p>
                        <p><label className="fw6">Item 3:<input className="w-75 mr4" value={item3} readOnly={true} /></label><span><input className="pl3 pointer v-mid checkbox" type='checkbox' checked={peca3} readOnly={true} /></span></p>
                        <p><label className="fw6">Item 4:<input className="w-75 mr4" value={item4} readOnly={true} /></label><span><input className="pl3 pointer v-mid checkbox" type='checkbox' checked={peca4} readOnly={true} /></span></p>
                        <p><label className="fw6">Item 5:<input className="w-75 mr4" value={item5} readOnly={true} /></label><span><input className="pl3 pointer v-mid checkbox" type='checkbox' checked={peca5} readOnly={true} /></span></p>
                    </div>
                </div>

                <div className="w-100 center flex">
                    <div className="w-third pa1 pt0 ba ma1">
                        <p className="fw6">Tempo de mão de obra:</p>
                        <input className="w-75 noborder" value={tempo} readOnly={true} />
                    </div>
                    <div className="w-third pa1 pt0 ba ma1">
                        <p className="fw6">Prazo após aprovação:</p>
                        <input className="w-75 noborder" value={prazo} readOnly={true} />
                    </div>
                    <div className="w-third pa1 pt0 ba ma1">
                        <p className="fw6">Emitente:</p>
                        <input className="noborder" value={emitente} readOnly={true} style={{ textTransform: 'uppercase' }} />
                    </div>
                </div>

                <div>
                    <button className="ma1 fw9 black pv2 ph3 bg-light-gray ba b--gray hover-bg-gray hover-white" onClick={this.props.main}>Fechar</button>
                    <button className="ma1 fw9 black pv2 ph3 bg-light-gray ba b--gray hover-bg-gray hover-white" onClick={window.print}>Imprimir</button>
                </div>
            </div>
        )
    }
}



export default VerOrcamento