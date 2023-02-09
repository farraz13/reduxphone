import React, { Component, Fragment } from "react"
export default class UserItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name,
            phone: this.props.phone,
            isEdit: false,
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

    handleEdit = () => {
        this.setState({
            isEdit: true
        });
    }

    handleCancel = () => {
        this.setState({
            isEdit: false
        });
    }

    saveEdit = () => {
        this.props.update(this.state.name, this.state.phone)
        this.setState({
            isEdit: false
        });
    }
    render() {
        return (
            <tr>
                <td>{this.props.no}</td>
                {this.state.isEdit ?
                    <div>
                        <td>
                            <input type="text" name="name" className="form-control" value={this.state.name} onChange={this.handleInputChange} />
                        </td>
                        <td>
                            <input type="text" name="phone" className="form-control" value={this.state.phone} onChange={this.handleInputChange} />
                        </td>
                    </div>
                    :
                    <Fragment>
                        <td>{this.props.name}</td>
                        <td>{this.props.phone}</td>
                    </Fragment>

    }

                {this.props.sent ?
                    this.state.isEdit ?
                        <td>
                            <button className="btn btn-info mx-1" onClick={this.saveEdit}><i className="fa-solid fa-floppy-disk"></i> Save</button>
                            <button className="btn btn-warning" type="button" onClick={this.handleCancel}><i className="fa-solid fa-xmark"></i> Cancel</button>
                        </td>
                        :
                        <td>
                            <button className="btn btn-success mx-1" onClick={this.handleEdit}><i className="fa-solid fa-pencil"></i> Edit</button>
                            <button className="btn btn-danger" type="button" onClick={this.props.remove}><i className="fa-regular fa-trash-can"></i> Delete</button>
                        </td>
                    :
                    <td>
                        <button className="btn btn-warning" type="button" onClick={this.props.resend}><i className="fa-solid fa-rotate-right"></i> Resend</button>
                    </td>
                }
            </tr>
        )
    }
}