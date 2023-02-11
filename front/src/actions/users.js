import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});

const loadUserSuccess = (users, page, totalPage) => ({
  type: 'LOAD_USER_SUCCESS',
  users,
  page,
  totalPage
})

const loadUserFailure = () => ({
  type: 'LOAD_USER_FAILURE'
})

export const loadUser = () => (dispatch, getState) => request.get('users', { params: getState().users.params })
  .then(({ data }) => {
    // console.log(getState());
    dispatch(loadUserSuccess(data.data.result, data.data.page, data.data.totalPage))
  }).catch(() => {
    dispatch(loadUserFailure())
  })

export const addUserSuccess = (id, user) => ({
  type: 'ADD_USER_SUCCESS',
  id,
  user
})

export const addUserFailure = (id) => ({
  type: 'ADD_USER_FAILURE',
  id
})

export const addUserRedux = (id, name, phone) => ({
  type: 'ADD_USER',
  id,
  name,
  phone
})

export const addUser = (name, phone) => (dispatch, getState) => {
  const id = Date.now()
  let state = getState()
  if (!state.users.params.query && dispatch(searchUser())) {
    dispatch(addUserRedux(id, name, phone))
  }
  return request.post('users', { name, phone }).then(({ data }) => {
      dispatch(addUserSuccess(id, data.data))
  }).catch(() => {
    dispatch(addUserFailure(id))
  })
}


const removeUserSuccess = (id) => ({
  type: 'REMOVE_USER_SUCCESS',
  id
})

const removeUserFailure = () => ({
  type: 'REMOVE_USER_FAILURE'
})

export const removeUser = (id) => dispatch => {
  return request.delete(`users/${id}`).then(({ data }) => {
    dispatch(removeUserSuccess(id))
  }).catch((err) => {
    dispatch(removeUserFailure(err))
  })
}

const resendUserSuccess = (id, user) => ({
  type: 'RESEND_USER_SUCCESS',
  id,
  user
})

const resendUserFailure = () => ({
  type: 'RESEND_USER_FAILURE'
})

export const resendUser = (id, name, phone) => dispatch => {
  return request.post('users', { name, phone }).then(({ data }) => {
    dispatch(resendUserSuccess(id, data.data))
  }).catch((err) => {
    dispatch(resendUserFailure(err))
  })
}

const updateUserSuccess = (id, user) => ({
  type: 'UPDATE_USER_SUCCESS',
  id,
  user
})

const updateUserFailure = (error) => ({
  type: 'UPDATE_USER_FAILURE',
  error
})

export const updateUser = (id, name, phone) => dispatch => {
  return request.put(`users/${id}`, { name, phone }).then(({ data }) => {
    dispatch(updateUserSuccess(id, data.data))
  }).catch((error) => {
    dispatch(updateUserFailure(error))
  })
}

const loadMoreSuccess = (user) => ({
  type: 'LOAD_MORE_SUCCESS',
  user
})


export const loadMore = () => (dispatch, getState) => {
  let state = getState()
  if (state.users.params.page < state.users.params.totalPage) {
    let params = {
      ...state.users.params,
      page: state.users.params.page + 1
    }
    request.get(`users`, { params }).then(({ data }) => {
      params = {
        ...params,
        totalPage: data.data.totalPage
      }
      dispatch(loadMoreSuccess({ value: data.data.result, params }))
    })
  }
}


const searchUserSuccess = (user) => ({
  type: 'SEARCH_USER_SUCCESS',
  user
})

const searchUserFailure = (user) => ({
  type: 'SEARCH_USER_FAILURE',
  user
})

export const searchUser = (query) => (dispatch, getState) => {
  let state = getState()
  let params = {
    ...state.users.params,
    ...query, 
    page: 1
  }
  return request.get(`users`, { params }).then(({ data }) => {
    params = {
      ...params,
      totalPage: data.data.totalPage
    }
    dispatch(searchUserSuccess({ value: data.data.result, params }))
  }).catch((error) => {
    dispatch(searchUserFailure(error))
  })
}



