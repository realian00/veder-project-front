import React from "react";
import './WrongPassword.css'

const WrongPassword = (props) => {
    return (
        <div className="tc ph0 ba bw0 shadow-5 br3 w-50 vh-50 center backWrongPassword">
            <h2 className="pa3">Login</h2>
            <div className="tc">
               <p>Nome de usuário ou senha inválidos!</p>
               <button className="ma4 mb2 fw9 black pv2 ph3 bg-light-gray ba b--gray hover-bg-gray hover-white" onClick={props.onClick}>Retorna</button>
            </div>
        </div>
    )
}

export default WrongPassword