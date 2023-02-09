import UserItem from "../components/UserItem"
import React, { Component } from "react"
import { loadUser, removeUser, resendUser, updateUser, loadMore } from "../actions/users";
import { connect } from "react-redux";

// const scrolling = (event) => {
//     var element = event.target;
//     if (element.scrollHeight - element.scrollTop === element.clientHeight) {
//         // this.props.loadUser()
//     }
// }

class UserList extends Component {
    componentDidMount() {
        this.props.load()
    }

     scrolling = (event) => {
        var element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            this.props.loadMore()
        }
    }

    render() {
        return (
            <div onScroll={this.scrolling} style={{ overflow: 'scroll', height: 250 }}>
                <table className="table table-striped mt-4">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.users.map((user, index) => {
                            return (
                                <UserItem
                                    key={user.id}
                                    no={index + 1}
                                    name={user.name}
                                    phone={user.phone}
                                    sent={user.sent}
                                    remove={() => this.props.remove(user.id)}
                                    resend={() => this.props.resend(user.id, user.name, user.phone)}
                                    update={(name, phone)=> this.props.update(user.id, name, phone)}

                                />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}



const mapStateToProps = (state, ownProps) => {
    return {
        users: state.users.data

    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    load: () => dispatch(loadUser()),
    remove: (id) => dispatch(removeUser(id)),
    resend: (id, name, phone) => dispatch(resendUser(id, name, phone)),
    update: (id, name, phone) => dispatch(updateUser(id, name, phone)),
    loadMore: () => dispatch(loadMore())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList)