import React, { Component } from "react"
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent
} from "react-pro-sidebar";
import {
    FaList,
    FaHome,
    FaPaperclip,
    FaPoll,
} from "react-icons/fa";


class Aside extends Component {

    constructor(props) {
        super(props)
        this.state = {
            image: '',
            collapsed: true,
            rtl: '',
            toggled: '',
            handleToggleSidebar: ''
        }
    }

    open = () => {
        setTimeout(() => {
         this.setState({ collapsed: false })   
        }, 750);
    }

    close = () => {      
            this.setState({ collapsed: true })   
       }



    render() {
        return (
            <ProSidebar

                collapsed={this.state.collapsed}

                onMouseEnter={this.open}
                onMouseLeave={this.close}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: "0px",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                            fontSize: 14,
                            letterSpacing: "1px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        }}
                    >
                        <Menu iconShape="circle">
                            <MenuItem icon={<FaList />}> Menu</MenuItem>
                        </Menu>

                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem icon={<FaHome />} onClick={this.props.onClickMain}> Principal</MenuItem>
                        <MenuItem icon={<FaPaperclip />} onClick={this.props.onClickLancar}> Lançar</MenuItem>
                        <MenuItem icon={<FaPoll />} onClick={this.props.onClickConcluidas}> Concluídas</MenuItem>
                    </Menu>

                </SidebarContent>

                <SidebarFooter >
                    <div className="pa2">
                        <p className="ma0 pa1 white center">{`${this.props.username}`}</p>
                        <button className="pt2 f5 mr1 bw0 link dib pointer bg-transparent fw7 hover-red white" id="concluidas" onClick={this.props.logout}>Logout</button>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        )
    }

}

export default Aside;
