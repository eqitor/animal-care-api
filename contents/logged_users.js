//Array with cointains logged users

class LoggedUsers {
    
    constructor() {
        this.users = [];
        console.log('New list of logged users created.');
    }

    add_user(user){

        console.log(`User ${user[0].login} logged in.`);
        this.users.push({login: user[0].login, password: user[0].haslo});
    }

    remove_user(user){
        let example = this.users.find(c => c.login === user[0].login);
        this.users.splice(this.users.indexOf(example),1);
        console.log(`User ${user} removed.`);
    }

    is_logged(user){
        if(typeof(user) == 'string')
        {
            if(this.users.find(c => `'${c.login}'` == user) == undefined) return false;
            return true;
        }
        
        if(this.users.find(c => c.login === user[0].login) == undefined) return false;
        return true;
    }

    show_logged_users(){
        console.log(users);
    }
}

var loggedUsers = new LoggedUsers();
module.exports.loggedUsers = loggedUsers;
