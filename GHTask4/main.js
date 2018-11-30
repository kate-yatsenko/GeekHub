'use strict'

;(function () {

    checkGlobalScope('ChatHistory', ChatHistory);
    checkGlobalScope('Message', Message);
    checkGlobalScope('User', User);


    ChatHistory.chats = [];

    function ChatHistory(name) {
        if (!name) throw new Error("You have not entered a chat name");

        this.chatName = name;
        this.messages = [];
        this.usersWhoConnect = [];
        ChatHistory.checkName(this.chatName);
        ChatHistory.chats.push(this);
    }

    ChatHistory.checkName = function (name) {
        for (var i = 0; i < ChatHistory.chats.length; i++) {
            if (ChatHistory.chats[i].chatName === name) {
                throw new Error('Name ' + name + ' already used');
            }
        }
    };

    ChatHistory.returnChats = function () {
        return ChatHistory.chats;
    };

    ChatHistory.prototype.addUser = function () {
        for (var i = 0; i < arguments.length; i++) {
            var userInstance = arguments[i];
            this.usersWhoConnect.push(userInstance);
        }

    };

    ChatHistory.prototype.deleteUser = function () {
        for (var j = 0; j < arguments.length; j++) {
            var userInstance = arguments[j];
            for (var i = 0; i < this.usersWhoConnect.length; i++) {
                if (this.usersWhoConnect[i] === userInstance) {
                    this.usersWhoConnect.splice(i, 1);
                }
            }
        }

    };

    ChatHistory.prototype.checkConnect = function (userInstance) {
        for (var i = 0; i < this.usersWhoConnect.length; i++) {
            if (this.usersWhoConnect[i] === userInstance) {
                return 'true'
            }
        }
    };

    ChatHistory.prototype.sendMessage = function (userInstance, message) {
        if (this.checkConnect(userInstance)) {
            var message = new Message(userInstance, message);
            this.messages.push(message);
            return message;
        }
        throw new Error('Don\'t connect');
    };

    ChatHistory.prototype.showHistory = function (count, index) {
        if (arguments.length === 2) {
            var indexMessage = index;
            var countMessage = indexMessage + count;
        } else if (arguments.length === 1) {
            var indexMessage = 0;
            var countMessage = indexMessage + count;
        } else if (arguments.length === 0) {
            var indexMessage = 0;
            var countMessage = 10;
        }
        for (var i = indexMessage; i < countMessage; i++) {
            console.log('[' + this.messages[i].user.name + ']' + '{connect: ' + this.checkConnect(this.messages[i].user) + '} [' + this.messages[i].timeLog() + '] message: ' + this.messages[i].message);
        }
    };

    ChatHistory.prototype.showUsersUnreadMessage = function (userInstance, count) {
        var countMessages = (this.messages.length - count) || 0;
        for (var i = this.messages.length - 1; i >= countMessages; i--) {
            if (this.messages[i].whoRead.indexOf(userInstance) !== -1) {
                if (count) countMessages--;
                continue;
            }
            console.log('[' + this.messages[i].user.name + ']' + '{connect: ' + this.checkConnect(this.messages[i].user) + '} [' + this.messages[i].timeLog() + '] message: ' + this.messages[i].message);
            this.messages[i].readMessage(userInstance);

        }
    };


    function Message(userInstance, message) {
        if (!userInstance || !message) throw new Error("Don't input user or message");

        this.message = message;
        this.time = new Date;
        this.user = userInstance;
        this.whoRead = [this.user];
    }

    Message.prototype.readMessage = function (userInstanceRead) {
        this.whoRead.push(userInstanceRead);
    };

    Message.prototype.timeLog = function () {
        var time = this.time;
        var hours = time.getHours();
        var min = time.getMinutes();
        var sec = time.getSeconds();
        var ms = time.getMilliseconds();
        return hours + ':' + min + ':' + sec + '.' + ms;
    };


    User.users = [];

    function User(name) {

        User.users.push(this);
        this.name = name;
    }

    User.prototype.chooseDefaultChat = function (defaultInstansChat) {
        this.defaultInstansChat = defaultInstansChat;
    };

    User.prototype.chooseChat = function (newInstansChat) {
        var chat = newInstansChat || this.defaultInstansChat;
        if (!newInstansChat && !this.defaultInstansChat) throw new Error('Don\'t choose chat');
        chat.addUser(this);
    };

    User.prototype.deleteChat = function (deleteInstansChat) {
        var chat = deleteInstansChat || this.defaultInstansChat;
        if (!deleteInstansChat && !this.defaultInstansChat) throw new Error('Don\'t choose chat');
        chat.deleteUser(this);
    };

    User.prototype.addMessage = function (message, chatInstans) {
        var chat = chatInstans || this.defaultInstansChat;
        if (!chatInstans && !this.defaultInstansChat) throw new Error('Don\'t choose chat');
        chat.sendMessage(this, message);
    };

    User.prototype.showUnreadMessage = function (chatInstans, count) {
        var chat = chatInstans || this.defaultInstansChat;
        var countMessages = (chat.messages.length - count) || (chat.messages.length - 10);

        if (!chatInstans && !this.defaultInstansChat) throw new Error('Don\'t choose chat');
        for (var i = chat.messages.length - 1; i >= countMessages; i--) {
            if (chat.messages[i].whoRead.indexOf(this) !== -1) {
                countMessages--;
                continue;
            }
            console.log('[' + chat.messages[i].user.name + ']' + '{connect: ' + chat.checkConnect(chat.messages[i].user) + '} [' + chat.messages[i].timeLog() + '] message: ' + chat.messages[i].message);
            chat.messages[i].readMessage(this);

        }
    };

    function checkGlobalScope(propertyName, value) {
        if (window.hasOwnProperty(propertyName)) {
            throw new Error(propertyName + ' already used')
        } else {
            Object.defineProperty(window, propertyName, {
                value: value,
                writable: false
            });
        }
    }
})();


function test() {
    var chat1 = new ChatHistory('chat1');
    var chat2 = new ChatHistory('chat2');
    var user1 = new User('kate');
    var user2 = new User('pasha');
    var user3 = new User('lena');
    chat1.addUser(user1, user2, user3);
    chat1.sendMessage(user3, 'hello');
    chat1.sendMessage(user1, 'how are you?');
    chat1.sendMessage(user2, 'Fine');
    chat1.sendMessage(user1, 'hello1');
    chat1.sendMessage(user1, 'how are you?1');
    chat1.sendMessage(user2, 'Fine1');
    chat1.sendMessage(user1, 'hello2');
    chat1.sendMessage(user1, 'how are you?2');
    chat1.sendMessage(user2, 'Fine2');
    chat1.sendMessage(user1, 'hello3');
    chat1.sendMessage(user1, 'how are you?3');
    chat1.sendMessage(user2, 'Fine3');
    chat1.sendMessage(user1, 'hello4');
    chat1.sendMessage(user1, 'how are you?4');
    chat1.sendMessage(user2, 'Fine4');
    chat1.sendMessage(user1, 'hello5');
    chat1.sendMessage(user1, 'how are you?5');
    chat1.sendMessage(user2, 'Fine5');
    chat1.sendMessage(user3, 'how are you?6');
    chat1.sendMessage(user3, 'Fine6');
    chat1.showHistory();
    console.log('----------------------------');
    chat1.deleteUser(user2, user3);
    chat1.showHistory();
    user1.chooseDefaultChat(chat2);
    user1.chooseChat();
    user2.chooseChat(chat2);
    console.log('----------------------------');
    user1.addMessage('Privet');
    user1.addMessage('Privet3');
    user1.addMessage('Privet4');
    user1.addMessage('Privet5');
    user1.addMessage('Privet6');
    user2.addMessage('Privet7', chat2);
    user2.addMessage('Privet8', chat2);
    user2.addMessage('Privet9', chat2);
    user2.addMessage('Privet10', chat2);
    user2.addMessage('Privet11', chat2);
    user2.addMessage('Privet12', chat2);
    chat2.showHistory();
    chat2.deleteUser(user2);
    user1.deleteChat(chat2);
    console.log('----------------------------');
    chat2.showHistory(4, 2);
}
test();