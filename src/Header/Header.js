import React from "react"
import './Header.css'
import logo from './logo-dark.png'

function Header(props) {
    return (
      <div className="flex flex-wrap ma0 headBar dtc v-mid tc shadow-5" >
        <div className="dtc v-mid tc marg pr5 flex">
          <div className="f4 mr1 bw0 dib bg-transparent pa1 pr3"><img src={logo}></img></div>
          <button className="f4 mr1 bw0 link dib pointer bg-transparent fw7 hover-white" id="main" onClick={props.onClick}>Principal</button>
          <button className="f4 mr1 bw0 link dib pointer bg-transparent fw7 hover-white" id="lancar" onClick={props.onClick}>Lançar</button>
          {/* <button className="f4 mr1 bw0 link dib pointer bg-transparent fw7 hover-white" id="pendencias" onClick={props.onClick}>Pendências</button> */}
          <button className="f4 mr1 bw0 link dib pointer bg-transparent fw7 hover-white" id="concluidas" onClick={props.onClick}>Concluídas</button>
        </div>
  
        <div className=" fl w-25 marg">
          <input className="w-100 pa2 br2" type='search' placeholder="buscar cliente, OS, NF ou produto" onChange={props.change} value={props.searchfield}></input>
        </div>

        <div className="pa0 tc justify-end logMarg pt2">
          <p className="ma0 pa2 white">{`Usuário: ${props.username}`}</p>
          <button className="f5 mr1 bw0 link dib pointer bg-transparent fw7 hover-red white" id="concluidas" onClick={props.logout}>Logout</button>
        </div>
      </div>
    )
  }

  export default Header