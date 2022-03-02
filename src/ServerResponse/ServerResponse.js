import React from "react";
import './ServerResponse.css'

const ServerResponse = (props) => {
    if (props.response === 'success') {
        return(
            <div className="tc ph0 ba bw0 shadow-5 br3 w-50 center backResponseSuccess vh-50 ma2">
                <h1 className="pa2">Enviado com sucesso</h1>
                <button className="mb2 fw9 black pv2 ph3 bg-light-gray ba b--gray hover-bg-gray hover-white mt4" onClick={props.onClick}>Retorna</button>
            </div>
        ) 
    }  else if (props.response === 'failed') {
        return(
            <div className="tc ph0 ba bw0 shadow-5 br3 w-50 center backResponseFailed vh-50 ma2">
                <h1 className="pa2">Falha no envio</h1>
                <button className="mb2 fw9 black pv2 ph3 bg-light-gray ba b--gray hover-bg-gray hover-white mt4" onClick={props.onClick}>Retorna</button>
            </div>  
        )
    }
}

export default ServerResponse