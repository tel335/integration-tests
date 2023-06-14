import userActions from '../../actions/user/user'

exports.getAllUsers = (ctx) => {
    ctx.body = userActions.getUsers()
    return ctx
}

exports.createUser = (ctx) => {
    const body = ctx.request.body
    if (!body || Object.keys(body).length === 0) {
        ctx.status = 400
        ctx.body = { message: 'User data is missing' }
        return ctx
    }
    userActions.addUser(body)
    ctx.body = { message: 'User was created' }
    return ctx
}

exports.removeUser = (ctx) => {
    userActions.removeUser(ctx.params.rol)
    ctx.body = { message: 'User was removed' }
    return ctx
}
