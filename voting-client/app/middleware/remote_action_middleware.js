export default socket => store => next => action => {
    if(action.meta && action.meta.remote) {
        console.log("Emitting action",action);
        socket.emit('action', action);
    }
    return next(action);
}