'use strict'

;(function() {

    checkGlobalScope('ChatHistory', ChatHistory);
    checkGlobalScope('Message', Message);
    checkGlobalScope('User', User);


    ChatHistory.chats = [];

    function ChatHistory(name) {
        if (!name) throw new Error("Don't input name of chat");

        this.chatName = name;
        this.messages = [];
        this.usersWhoConnect = [];
        ChatHistory.chats.push(this);

        ChatHistory.returnChats = function () {
            return ChatHistory.chats;
        }

        this.addUser = function (userInstans) {
            this.usersWhoConnect.push(userInstans);
        }

        this.deleteUser = function (userInstans) {
            for (var i = 0; i < this.usersWhoConnect.length; i++) {
                if (this.usersWhoConnect[i] == userInstans) {
                    this.usersWhoConnect.splice(i, 1);
                }
            }
        }

        this.checkConnect = function (userInstans) {
            for (var i = 0; i < this.usersWhoConnect.length; i++) {
                if (this.usersWhoConnect[i] == userInstans) {
                    return true;
                }

            }
        }

        this.sendMessage = function (userInstans, message) {
            if (this.checkConnect(userInstans)) {
                var message = new Message(userInstans, message);
                this.messages.push(message);
                return message;
            }
            throw new Error('Don\'t connect');
        }

        this.showHistory = function (index, count) {
            var indexMessage = index || 0;
            var countMessage = (indexMessage + count) || 10;
            for (var i = indexMessage; i < countMessage; i++) {
                console.log('[' + this.messages[i].user.name + ']' + '{connect: ' + this.checkConnect(this.messages[i].user) + '} [' + this.messages[i].timeLog() + '] message: ' + this.messages[i].message);
            }
        }

        this.showUsersUnreadMessage = function (userInstans, count) {
            var countMessages = (this.messages.length - count) || 0;
            for (var i = this.messages.length - 1; i >= countMessages; i--) {
                if (this.messages[i].whoRead[userInstans.id]) {
                    if (count) countMessages--;
                    continue;
                }
                console.log('[' + this.messages[i].user.name + ']' + '{connect: ' + this.checkConnect(this.messages[i].user) + '} [' + this.messages[i].timeLog() + '] message: ' + this.messages[i].message);
                this.messages[i].readMessage(userInstans);
            }
        }

    }

    function Message(userInstans, message) {
        if (!userInstans || !message) throw new Error("Don't input user or message");

        this.message = message;
        this.time = new Date;
        this.user = userInstans;
        this.whoRead = [];
        this.whoRead[this.user.id] = true;

        this.readMessage = function (userInstansRead) {
            this.whoRead[userInstansRead.id] = true;
        }

        this.timeLog = function () {
            var time = this.time;
            var hours = time.getHours();
            var min = time.getMinutes();
            var sec = time.getSeconds();
            var timeWithoutMs = new Date(time.getFullYear(), time.getMonth(), time.getDate(), hours, min, sec);
            var ms = time - timeWithoutMs;
            return hours + ':' + min + ':' + sec + '.' + ms;
        }
    }

    User.users = [];

    function User(name) {

        User.users.push(this);
        this.id = User.users.length - 1;
        this.name = name;
        this.unreadMessages = [];

        this.chooseDefaultChat = function (defaultInstansChat) {
            this.defaultInstansChat = defaultInstansChat;
        }

        this.chooseChat = function (newInstansChat) {
            var chat = newInstansChat || this.defaultInstansChatName;
            if (!newInstansChat && !this.defaultInstansChatName) throw new Error('Don\'t choose chat');
            chat.addUser(this);
        }

        this.deleteChat = function (deleteInstansChat) {
            var chat = deleteInstansChat || this.defaultInstansChatName;
            if (!deleteInstansChat && !this.defaultInstansChatName) throw new Error('Don\'t choose chat');
            chat.deleteUser(this);
        }

        this.addMessage = function (chatInsansName, message) {
            var chat = chatInsansName || this.defaultInstansChatName;
            if (!chatInstansName && !this.defaultInstansChatName) throw new Error('Don\'t choose chat');
            chat.sendMessage(this, message);
        }

        this.showUnreadMessage = function (chatInstansName, count) {
            var chat = chatInstansName || this.defaultInstansChat;
            var countMessages = (chat.messages.length - count) || (chat.messages.length - 10);

            if (!chatInstansName && !this.defaultInstansChat) throw new Error('Don\'t choose chat');
            for (var i = chat.messages.length - 1; i >= countMessages; i--) {
                if (chat.messages[i].whoRead[this.id]) {
                    countMessages--;
                    continue;
                }
                console.log('[' + chat.messages[i].user.name + ']' + '{connect: ' + chat.checkConnect(chat.messages[i].user) + '} [' + chat.messages[i].timeLog() + '] message: ' + chat.messages[i].message);
                chatInstansName.messages[i].readMessage(this);
            }
        }
    }

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


function test(){
    var chat1 = new ChatHistory('chat1');
    var chat2 = new ChatHistory('chat2');
    var user1 = new User('kate');
    var user2 = new User('pasha');
    var user3 = new User('lena');
    chat1.addUser(user1);
    chat1.addUser(user2);
    chat1.addUser(user3);
    chat1.sendMessage(user1, 'hello');
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
    chat1.sendMessage(user3, 'how are you?5');
    chat1.sendMessage(user3, 'Fine5');

    console.log(chat1.usersWhoConnect);
    chat1.showUsersUnreadMessage(user3, 3);
    console.log('-----------------');
    chat1.showUsersUnreadMessage(user3, 3);
    console.log('----------------------------');
    user3.showUnreadMessage(chat1, 1);
    console.log('----------------------------');
    chat1.showHistory();
}