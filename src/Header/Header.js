import React from "react"
import './Header.css'
import logo from './logo-dark.png'

function Header(props) {
  return (
    <div className="flex flex-wrap ma0 headBar dtc v-mid tc shadow-5" >
      <div className="dtc v-mid tc marg pr5 flex">
        <div className="f4 mr1 bw0 dib bg-transparent pa1 pr3"><img src={logo} alt='veder logo'></img></div>
      </div>

      <div className=" fl w-50 marg">
        <input className="w-100 pa2 br2" type='search' placeholder="buscar cliente, OS, NF ou produto" onChange={props.change} value={props.searchfield}></input>
      </div>

      <div className="dtc v-mid tc marg pl5 flex white"><label className="pointer">Exibir Pendências:<input className="pl1 pointer v-mid checkbox" type='checkbox' value='a' onChange={props.changePending} checked={props.showPending} /></label></div>
    </div>
  )
}

export default Header