import React, { Component } from "react";
import { addUser } from "../actions/users";
import { connect } from 'react-redux'

class UserForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phone: '',
            isAdd: false
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.submit(this.state.name, this.state.phone)
        this.setState({ name: '', phone: '' })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row g-3 align-items-center">
                    <div className="col-auto">
                        <label htmlFor="name" className="col-form-label">Name</label>
                    </div>
                    <div className="col-auto">
                        <input type="text" id="name" name="name" className="form-control" aria-describedby="passwordHelpInline" onChange={this.handleInputChange} value={this.state.name} placeholder="name" />
                    </div>
                    <div className="col-auto">
                        <label htmlFor="phone" className="col-form-label">Phone</label>
                    </div>
                    <div className="col-auto">
                        <input type="integer" id="phone" name="phone" className="form-control" aria-describedby="passwordHelpInline" onChange={this.handleInputChange} value={this.state.phone} placeholder="phone" />
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-success" type="submit"><i className="fa-regular fa-circle-check"></i> {this.props.submitLabel || 'Save'}</button>
                        <button className="btn btn-warning text-light" onClick={this.props.cancel}><i className="fa-solid fa-ban"></i> Cancel</button>
                    </div>
                </div>
            </form>
        )
    }
}


const mapDispatchToProps = (dispatch, ownProps) => ({
    submit: (name, phone) => dispatch(addUser(name, phone))
})

export default connect(
    null,
    mapDispatchToProps
)(UserForm)