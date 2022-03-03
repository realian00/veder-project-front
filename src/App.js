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


import './App.css'
import "tachyons"


// const serverAddress = 'https://ec2-18-228-166-126.sa-east-1.compute.amazonaws.com:3004' 
const serverAddress = 'https://gcloudservice.biz:3004'
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
      serverResponse: '',
      timeout: 0
    }
  }

  callDatabase = (event) => {
    let requisition = { db: 'data', col: 'mainCards' }
    if (event !== undefined) {
      if (event.target.id !== 'concluidas') {
        requisition = { db: 'data', col: 'mainCards' }
      } else if (event.target.id === 'concluidas') {
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

  temporaryLoginHandle = (event) => {

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
    this.setState({ username: '' })
    this.setState({ password: '' })
    return this.setState({ currentPage: 'login' })
  }




  clickChangePage = (event) => {

    this.callDatabase(event)
    this.setState({ searchfield: '' })
    this.setState({ currentPage: event.target.id })
  }

  clickList = (event) => {
    return this.state.database.map((item, i) => {
      if (item._id === event.target.id || item._id === event.target.parentElement.id) {
        this.setState({ singleCardData: item })
        this.setState({ updateObs: { newValue: item.obs } })
        return this.setState({ currentPage: 'singleCard' })
      }
    })
  }

  clickReturn = () => {
    this.setState({ currentPage: 'main'})
    this.setState({ serverResponse: ''})
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
        this.setState({ serverResponse: response})
        this.setState({ currentPage: 'serverResponse' })
      })
  }

  enviar = () => {
    const updateObs = Object.assign(this.state.singleCardData, this.state.updateObs)
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
        this.setState({ serverResponse: response})
        this.setState({ currentPage: 'serverResponse' })
      })
  }


  atualizar = () => {
    const updateObs = Object.assign(this.state.singleCardData, this.state.updateObs)
    const body = JSON.stringify(updateObs)

    return fetch(`${serverAddress}/atualizar`,
      {
        mode: 'cors',
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: body
      }).then((response) => response.json()
        ).then((response) => {
          this.setState({ serverResponse: response})
          this.setState({ currentPage: 'serverResponse' })
        }).then(() => {
          this.callDatabase()
        })
  }

  updateDb = () => {
    if (this.state.timeout === 0) {
      this.callDatabase()
      this.setState({ timeout: 10 })
    }  
  }

  render() {
    
    socket.once("update", (arg) => {

      setTimeout(() => {
        this.setState({ timeout: 0})
      }, 500);
      this.updateDb()

    })

    const searchedCliente = this.state.database.filter(e => {
      return e.cliente.toLowerCase().includes(this.state.searchfield.toLowerCase())
    })

    const searchedOs = this.state.database.filter(e => {
      return e.os.toLowerCase().includes(this.state.searchfield.toLowerCase())
    })

    const searchedNf = this.state.database.filter(e => {
      return e.nf.toLowerCase().includes(this.state.searchfield.toLowerCase())
    })

    const searchedProduto = this.state.database.filter(e => {
      return e.produto.toLowerCase().includes(this.state.searchfield.toLowerCase())
    })

    const concatDatabase = searchedCliente.concat(searchedOs, searchedNf, searchedProduto)
    const finalDatabase = [...new Set(concatDatabase)]


    if (this.state.currentPage === 'main') {
      return (
        <div>
          <Header change={this.onSearchChange} onClick={this.clickChangePage} username={this.state.username} logout={this.handleLogout} searchfield={this.state.searchfield}/>
          <Main finalDatabase={finalDatabase} onClick={this.clickList} />
        </div>
      )
    } else if (this.state.currentPage === 'lancar') {
      return (
        <div>
          <div>
            <Header change={this.onSearchChange} onClick={this.clickChangePage} username={this.state.username} logout={this.handleLogout} searchfield={this.state.searchfield}/>
            <Lancar serverAddress={serverAddress}/>
          </div>
        </div>
      )
    } else if (this.state.currentPage === 'concluidas') {
      return (
        <div>
          <div>
            <Header change={this.onSearchChange} onClick={this.clickChangePage} username={this.state.username} logout={this.handleLogout} searchfield={this.state.searchfield}/>
            <Concluidas database={finalDatabase} onClick={this.clickList}/>
          </div>
        </div>
      )
    } else if (this.state.currentPage === 'singleCard') {
      return (
        <div>
          <div>
            <Header change={this.onSearchChange} onClick={this.clickChangePage} username={this.state.username} logout={this.handleLogout} searchfield={this.state.searchfield}/>
            <SingleCard selectedCard={this.state.singleCardData} onClickApagar={this.delete} onClickEnviar={this.enviar} onClickAtualizar={this.atualizar} handleUpdateObs={this.handleUpdateObs} />
          </div>
        </div>
      )
    } else if (this.state.currentPage === 'login') {
      return (
        <div>
          <div>
            <Login onChange={this.onLoginChange} onClick={this.temporaryLoginHandle} />
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
          <Header change={this.onSearchChange} onClick={this.clickChangePage} username={this.state.username} logout={this.handleLogout} searchfield={this.state.searchfield}/>
            <ServerResponse response={this.state.serverResponse} onClick={this.clickReturn} />
          </div>
        </div>
      )
    }
  }
}


export default App


