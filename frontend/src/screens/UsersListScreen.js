import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteUserAction, usersList} from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Button, Table} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useNavigate} from "react-router-dom";

function UsersListScreen() {
    const dispatch = useDispatch()
    const userList = useSelector(state => state.usersList)
    const { loading, error, users } = userList
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const userDelete = useSelector(state => state.userDelete)
    const { success: successDeleteUser } = userDelete

    const { navigate } = useNavigate()

    const handleDelete = (userId) => {
        if (window.confirm('Are you sure you want delete user?')) {
            dispatch(deleteUserAction(userId))
        }
    }

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(usersList())
        } else {
            navigate('/login')
        }
    }, [dispatch]);

    return (
        <div>
            <h1>Users List</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant={'danger'}>{error}</Message>
            ) : (
                <Table striped bordered={true} hover responsive={true} className={'table-sm'}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>#{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin == true ? (
                                    <i className={'fas fa-check'} style={{color: 'green'}}></i>
                                ) : (<i className={'fas fa-times'} style={{color: 'red'}}></i>)}</td>
                                <td>
                                    <LinkContainer to={`/admin/users/${user._id}`}>
                                        <Button variant={'light'}>
                                            <i className={'fas fa-edit'}></i>
                                        </Button>
                                    </LinkContainer>

                                    <Button variant={'danger'} onClick={() => handleDelete(user._id)}>
                                        <i className={'fas fa-trash'}></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default UsersListScreen