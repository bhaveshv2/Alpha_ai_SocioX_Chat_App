const users = [];

module.exports.addUser = ({id,username,chatroom})=>{
    console.log('adduser');
    username = username.trim().toLowerCase();
    chatroom = chatroom.trim().toLowerCase();

    const existUser = users.find((user)=>user.username === username && user.chatroom === chatroom);

    if(!username || !chatroom){
        return {
            err:'Username and Chatroom required',
        }
    }

    if(existUser){
        return {err:'User name already exist!'};
    }

    const user = {id, username, chatroom};
    users.push(user);
    console.log(users);

    return {user};
};

module.exports.removeUser = (id)=>{
    console.log('remove user')
    const i = users.findIndex((user)=>user.id===id);

    if(i !== -1){
        return users.splice(i,1)[0];
    }
};

module.exports.getUser = (id)=> {
    return users.find((user)=>user.id === id);
};

