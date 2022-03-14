import React from "react";
import './Login.css'

const Login = (props) => {
    return (
        <div className="tc ph0 ba bw0 shadow-5 br3 w-50 vh-75 center backLogin" onKeyPress={props.onEnter}>
            <h1 className="pa1">Workflow App</h1>
            <h2>Módulo - Assistência Técnica</h2>
            <h2 className="pt4">Login</h2>

            <div className="tc">
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" >Usuário</label>
                        <input className="pa2 input-reset ba bg-white measure" type="text" id="username" onChange={props.onChange}></input>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5">Senha</label>
                        <input className="b pa2 input-reset ba bg-white" type="password" id="password" onChange={props.onChange}></input>
                    </div>
                    <button className="ma4 mb2 fw9 black pv2 ph3 bg-light-gray ba b--gray hover-bg-gray hover-white" onClick={props.onClick}>Login</button>
                    <div className="tr pa1">V1.1.0 - Developed by <a className="link underline blue hover-red" href="https://github.com/realian00" target="_blank" rel="noopener noreferrer">rG</a></div>
            </div>
        </div>
    )
}
export default Login