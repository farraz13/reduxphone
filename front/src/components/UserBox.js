import UserForm from "../containers/UserForm";
import UserList from "../containers/UserList";
import UserSearchForm from "../containers/UserSearchForm";
import React,{ Component } from "react";

export default class UserBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAdd: false
        }
    }

    showAdd = (props) => {
        if (!props.show) {
            return null;
        }
        return (
            <div className="card mt-4">
                <div className="card-header">
                    <h6>Adding Form</h6>
                </div>
                <div className="card-body">
                    <UserForm cancel={this.handleCancelClick} />
                </div>
            </div>
        );
    }

    handleClickAdd = () => {
        this.setState(state => ({
            isAdd: !state.isAdd
        }));
    }

    handleCancelClick = () => {
        this.setState({
            isAdd: false
        });
    }

    render() {

        return (
            <div className="container mt-3">
                <div className="card">
                    <div className="card-header text-center p-4">
                        <h1>Phone Book Apps</h1>
                    </div>
                </div>
                <div>
                    {this.state.isAdd ? <this.showAdd show={this.state.isAdd} /> : <button className='btn btn-primary mt-4' onClick={this.handleClickAdd} ><i className="fa-solid fa-plus"></i> add</button>}
                </div>

                <div className="card mt-4">
                    <div className="card-header">
                        <h6>Search Form</h6>
                    </div>
                    <div className="card-body">
                        <UserSearchForm  />
                    </div>
                </div> 
                <UserList 
                />
                </div>
        )
    }
}