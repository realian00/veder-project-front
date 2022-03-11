import React, { Component } from "react";
import Main from "./Main/Main";
import Header from "./Header/Header";
import Lancar from "./Lancar/Lancar";
import SingleCard from "./SingleCard/SingleCard";
import Concluidas from "./Concluidas/Concluidas";
import Login from "./Login/Login";
import WrongPassword from "./WrongPassword/WrongPassword";
import ServerResponse from "./ServerResponse/ServerResponse";
import { io } from "socket.io-client";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

import Aside from "./Aside.js"


import './App.css'
import 'react-pro-sidebar/dist/css/styles.css';
import "tachyons"


const serverAddress = 'http://ec2-18-228-166-126.sa-east-1.compute.amazonaws.com:3008' 
// const serverAddress = 'https://gcloudservice.biz:3004'
const socket = io(serverAddress, { transports: ['websocket', 'polling', 'flashsocket'] });
// const socket = io(serverAddress, {secure: true, reconnect: true, rejectUnauthorized: false})


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      database: [],
      concluidasDatabase: [],
      searchfield: '',
      currentPage: 'login',
      singleCardData: '',
      username: '',
      password: '',
      loggedUser: 'none',
      updateObs: { newValue: '' },
      checked: false,
      showPending: true,
      serverResponse: '',
      timeout: 0,
    }
  }

  callDatabase = (event) => {
    let requisition = { db: 'data', col: 'mainCards' }
    if (event !== undefined) {
      if (event !== 'concluidas') {
        requisition = { db: 'data', col: 'mainCards' }
      } else if (event === 'concluidas') {
        requisition = { db: 'concluido', col: 'cards' }
      }
    }

    fetch(`${serverAddress}/main`, {
      mode: 'cors',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requisition)

    })
      .then(resp => { return resp.json() })
      .then((respData) => {
        this.setState({ database: respData })
      })
      .catch(error => {
        console.log('opps, not found')
        throw (error)
      })
  }

  componentDidMount() {
    window.requestAnimationFrame(() => this.setState({ mounted: true }))
    return this.callDatabase()
  }

  onSearchChange = (event) => {
    return this.setState({ searchfield: event.target.value })
  }

  onLoginChange = (event) => {
    if (event.target.id === 'username') {
      return this.setState({ username: event.target.value })
    } else if (event.target.id === 'password') {
      return this.setState({ password: event.target.value })
    }
  }

  onEnter = (event) => {
    if (event.key === 'Enter') {
      if (this.state.currentPage === 'login') {
        this.temporaryLoginHandle()
      } else if (this.state.currentPage === 'wrongPassword') {
        this.wrongPassword()
      }
    }
  }

  temporaryLoginHandle = () => {

    const body = JSON.stringify({
      username: this.state.username,
      password: this.state.password
    })

    fetch(`${serverAddress}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    })
      .then((resp) => {
        return resp.json()
      }).then((resp) => {
        this.setState({ loggedUser: resp.username })
        if (this.state.loggedUser !== 'none') {
          return this.setState({ currentPage: 'main' })
        } else {
          return this.setState({ currentPage: 'wrongPassword' })
        }
      })
  }


  wrongPassword = () => {
    return this.setState({ currentPage: 'login' })
  }

  handleLogout = () => {
    this.setState({ showPending: true })
    this.setState({ username: '' })
    this.setState({ password: '' })
    return this.setState({ currentPage: 'login' })
  }




  clickChangePageMain = (event) => {
    this.callDatabase('main')
    this.setState({ searchfield: '' })
    this.setState({ currentPage: 'main' })
  }

  clickChangePageLancar = (event) => {
    this.setState({ searchfield: '' })
    this.setState({ currentPage: 'lancar' })
  }

  clickChangePageConcluidas = (event) => {
    this.callDatabase('concluidas')
    this.setState({ searchfield: '' })
    this.setState({ currentPage: 'concluidas' })
  }

  clickList = (event) => {
    return this.state.database.map((item, i) => {
      if (item._id === event.target.id || item._id === event.target.parentElement.id) {
        this.setState({ checked: item.pendencia })
        this.setState({ singleCardData: item })
        this.setState({ updateObs: { newValue: item.obs } })
        return this.setState({ currentPage: 'singleCard' })
      }
    })
  }

  clickReturn = () => {
    this.setState({ currentPage: 'main' })
    this.setState({ serverResponse: '' })
  }


  handleUpdateObs = (event) => {
    return this.setState({ updateObs: { newValue: event.target.value } })
  }




  delete = () => {

    const body = JSON.stringify(this.state.singleCardData)

    return fetch(`${serverAddress}/delete`,
      {
        mode: 'cors',
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: body
      }).then(response => response.json()
      ).then((response) => {
        this.callDatabase()
        this.setState({ serverResponse: response })
        this.setState({ currentPage: 'serverResponse' })
      })
  }

  enviar = () => {
    const sendPendencia = { pendencia: this.state.checked }
    const updateObs = Object.assign(this.state.singleCardData, this.state.updateObs, sendPendencia)
    const body = JSON.stringify(updateObs)

    return fetch(`${serverAddress}/enviar`,
      {
        mode: 'cors',
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: body
      }).then(response => response.json()
      ).then((response) => {
        this.callDatabase()
        this.setState({ serverResponse: response })
        this.setState({ currentPage: 'serverResponse' })
      })
  }


  atualizar = () => {
    const sendPendencia = { pendencia: this.state.checked }
    const updateObs = Object.assign(this.state.singleCardData, this.state.updateObs, sendPendencia)
    const body = JSON.stringify(updateObs)

    return fetch(`${serverAddress}/atualizar`,
      {
        mode: 'cors',
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: body
      }).then((response) => response.json()
      ).then((response) => {
        this.setState({ serverResponse: response })
        this.setState({ currentPage: 'serverResponse' })
      }).then(() => {
        this.callDatabase()
      })
  }


  handleCheckbox = () => {
    if (this.state.checked === false) {
      this.setState({ checked: true })
    } else if (this.state.checked === true) {
      this.setState({ checked: false })
    }
  }


  updateDb = () => {
    if (this.state.timeout === 0) {
      this.callDatabase()
      this.setState({ timeout: 10 })
    }
  }


  changePending = () => {
    if (this.state.showPending === true) {
      this.setState({ showPending: false })
    } else {
      this.setState({ showPending: true })
    }
  }

  handleWarranty = () => {
    if (this.state.singleCardData.garantia === true) {
      this.setState(prevState => ({
        singleCardData: {                  
            ...prevState.singleCardData, 
            garantia: false    
        }
      }))
    } else if (this.state.singleCardData.garantia === false) {
      this.setState(prevState => ({
        singleCardData: {                  
            ...prevState.singleCardData, 
            garantia: true    
        }
      }))
    }
  }



  render() {

    socket.once("update", (arg) => {

      setTimeout(() => {
        this.setState({ timeout: 0 })
      }, 500);
      this.updateDb()

    })

    socket.on('connect', () => {
      setTimeout(() => {
        this.setState({ timeout: 0 })
      }, 500);
      this.updateDb()
    })

    socket.on('reconnect', () => {
      setTimeout(() => {
        this.setState({ timeout: 0 })
      }, 500);
      this.updateDb()
    })

    const searchedPendencia = this.state.database.filter(e => {
      if (this.state.showPending === false) {
        return e.pendencia === this.state.showPending
      } else {
        return e
      }

    })


    const searchedCliente = searchedPendencia.filter(e => {
      return e.cliente.toLowerCase().includes(this.state.searchfield.toLowerCase())
    })

    const searchedOs = searchedPendencia.filter(e => {
      return e.os.toLowerCase().includes(this.state.searchfield.toLowerCase())
    })

    const searchedNf = searchedPendencia.filter(e => {
      return e.nf.toLowerCase().includes(this.state.searchfield.toLowerCase())
    })

    const searchedProduto = searchedPendencia.filter(e => {
      return e.produto.toLowerCase().includes(this.state.searchfield.toLowerCase())
    })




    const concatDatabase = searchedCliente.concat(searchedOs, searchedNf, searchedProduto)
    const finalDatabase = [...new Set(concatDatabase)]

    if (this.state.currentPage === 'main') {
      return (
        <div>
          <Header change={this.onSearchChange} onClick={this.clickChangePage} username={this.state.username} logout={this.handleLogout} searchfield={this.state.searchfield} showPending={this.state.showPending} changePending={this.changePending} />
          <div className="flex">
            <Aside onClickMain={this.clickChangePageMain} onClickLancar={this.clickChangePageLancar} onClickConcluidas={this.clickChangePageConcluidas} username={this.state.username} logout={this.handleLogout}></Aside>
            <Main finalDatabase={finalDatabase} onClick={this.clickList} />
          </div>
        </div>
      )
    } else if (this.state.currentPage === 'lancar') {
      return (
        <div>
          <div>
            <Header change={this.onSearchChange} onClick={this.clickChangePage} username={this.state.username} logout={this.handleLogout} searchfield={this.state.searchfield} showPending={this.state.showPending} changePending={this.changePending} />
            <div className="flex">
              <Aside onClickMain={this.clickChangePageMain} onClickLancar={this.clickChangePageLancar} onClickConcluidas={this.clickChangePageConcluidas} username={this.state.username} logout={this.handleLogout}></Aside>
              <Lancar serverAddress={serverAddress} />
            </div>
          </div>
        </div>
      )
    } else if (this.state.currentPage === 'concluidas') {
      return (
        <div>
          <div>
            <Header change={this.onSearchChange} onClick={this.clickChangePage} username={this.state.username} logout={this.handleLogout} searchfield={this.state.searchfield} showPending={this.state.showPending} changePending={this.changePending} />
            <div className="flex">
              <Aside onClickMain={this.clickChangePageMain} onClickLancar={this.clickChangePageLancar} onClickConcluidas={this.clickChangePageConcluidas} username={this.state.username} logout={this.handleLogout}></Aside>
              <Concluidas database={finalDatabase} onClick={this.clickList} />
            </div>
          </div>
        </div>
      )
    } else if (this.state.currentPage === 'singleCard') {
      return (
        <div>
          <div>
            <Header change={this.onSearchChange} onClick={this.clickChangePage} username={this.state.username} logout={this.handleLogout} searchfield={this.state.searchfield} showPending={this.state.showPending} changePending={this.changePending} />
            <div className="flex">
              <Aside onClickMain={this.clickChangePageMain} onClickLancar={this.clickChangePageLancar} onClickConcluidas={this.clickChangePageConcluidas} username={this.state.username} logout={this.handleLogout}></Aside>
              <SingleCard selectedCard={this.state.singleCardData} onClickApagar={this.delete} onClickEnviar={this.enviar} onClickAtualizar={this.atualizar} handleUpdateObs={this.handleUpdateObs} handleCheckbox={this.handleCheckbox} checked={this.state.checked} handleWarranty={this.handleWarranty}/>
            </div>
          </div>
        </div>
      )
    } else if (this.state.currentPage === 'login') {
      return (
        <div>
          <div>
            <Login onChange={this.onLoginChange} onClick={this.temporaryLoginHandle} onEnter={this.onEnter} />
          </div>
        </div>
      )
    } else if (this.state.currentPage === 'wrongPassword') {
      return (
        <div>
          <div>
            <WrongPassword onClick={this.wrongPassword} />
          </div>
        </div>
      )
    } else if (this.state.currentPage === 'serverResponse') {
      return (
        <div>
          <div>
            <Header change={this.onSearchChange} onClick={this.clickChangePage} username={this.state.username} logout={this.handleLogout} searchfield={this.state.searchfield} showPending={this.state.showPending} changePending={this.changePending} />
            <div className="flex">
              <Aside onClickMain={this.clickChangePageMain} onClickLancar={this.clickChangePageLancar} onClickConcluidas={this.clickChangePageConcluidas} username={this.state.username} logout={this.handleLogout}></Aside>
              <ServerResponse response={this.state.serverResponse} onClick={this.clickReturn} />
            </div>
          </div>
        </div>
      )
    }
  }
}


export default App


