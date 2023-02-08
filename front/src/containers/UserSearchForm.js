import React,{ Component } from "react";
import {searchUser} from '../actions/users'
import { connect } from "react-redux";

class UserSearchForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phone: ''
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
        console.log('masuk submit', this.state.name, this.state.phone);
        event.preventDefault()
        this.props.search({name: this.state.name, phone: this.state.phone})
        // this.setState({ name: '', phone: '' })
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
                        <button className="btn" type="submit"></button>
                    </div>
                </div>
            </form>
        )
    }
}
const mapDispatchToProps = (dispatch, ownProps) => ({
    search: (query) => dispatch(searchUser(query))
})

export default connect(
    null,
    mapDispatchToProps
)(UserSearchForm)