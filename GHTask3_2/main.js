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

        ChatHistory.checkName = function (name) {
            for (var i = 0; i < ChatHistory.chats.length; i++) {
                if (ChatHistory.chats[i].chatName == name) {
                    throw new Error('Name ' + name + ' already used');
                }
            }
        };
        ChatHistory.checkName(this.chatName);

        ChatHistory.chats.push(this);

        ChatHistory.returnChats = function () {
            return ChatHistory.chats;
        };

        this.addUser = function () {
            for (var i = 0; i < arguments.length; i++) {
                var userInstans = arguments[i];
                this.usersWhoConnect.push(userInstans);
            }

        };

        this.deleteUser = function () {
            for (var j = 0; j < arguments.length; j++) {
                var userInstans = arguments[j];
                for (var i = 0; i < this.usersWhoConnect.length; i++) {
                    if (this.usersWhoConnect[i] == userInstans) {
                        this.usersWhoConnect.splice(i, 1);
                    }
                }
            }

        };

        this.checkConnect = function (userInstans) {
            for (var i = 0; i < this.usersWhoConnect.length; i++) {
                if (this.usersWhoConnect[i] == userInstans) {
                    return 'true';
                }
            }
        };

        this.sendMessage = function (userInstans, message) {
            if (this.checkConnect(userInstans)) {
                var message = new Message(userInstans, message);
                this.messages.push(message);
                return message;
            }
            throw new Error('Don\'t connect');
        };

        this.showHistory = function (count, index) {
            if (arguments.length == 2) {
                var indexMessage = index;
                var countMessage = indexMessage + count;
            } else if (arguments.length == 1) {
                var indexMessage = 0;
                var countMessage = indexMessage + count;
            } else if (arguments.length == 0) {
                var indexMessage = 0;
                var countMessage = 10;
            }
            for (var i = indexMessage; i < countMessage; i++) {
                console.log('[' + this.messages[i].user.name + ']' + '{connect: ' + this.checkConnect(this.messages[i].user) + '} [' + this.messages[i].timeLog() + '] message: ' + this.messages[i].message);
            }
        };

        this.showUsersUnreadMessage = function (userInstans, count) {
            var countMessages = (this.messages.length - count) || 0;
                for (var i = this.messages.length - 1; i >= countMessages; i--) {
                        if (this.messages[i].whoRead.indexOf(userInstans) != -1) {
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
        this.whoRead = [this.user];

        this.readMessage = function (userInstansRead) {
            this.whoRead.push(userInstansRead);
        };

        this.timeLog = function () {
            var time = this.time;
            var hours = time.getHours();
            var min = time.getMinutes();
            var sec = time.getSeconds();
            var ms = time.getMilliseconds();
            return hours + ':' + min + ':' + sec + '.' + ms;
        }
    }

    User.users = [];

    function User(name) {

        User.users.push(this);
        this.name = name;

        this.chooseDefaultChat = function (defaultInstansChat) {
            this.defaultInstansChat = defaultInstansChat;
        };

        this.chooseChat = function (newInstansChat) {
            var chat = newInstansChat || this.defaultInstansChat;
            if (!newInstansChat && !this.defaultInstansChat) throw new Error('Don\'t choose chat');
            chat.addUser(this);
        };

        this.deleteChat = function (deleteInstansChat) {
            var chat = deleteInstansChat || this.defaultInstansChat;
            if (!deleteInstansChat && !this.defaultInstansChat) throw new Error('Don\'t choose chat');
            chat.deleteUser(this);
        };

        this.addMessage = function (message, chatInstans) {
            var chat = chatInstans || this.defaultInstansChat;
            if (!chatInstans && !this.defaultInstansChat) throw new Error('Don\'t choose chat');
            chat.sendMessage(this, message);
        };

        this.showUnreadMessage = function (chatInstans, count) {
            var chat = chatInstans || this.defaultInstansChat;
            var countMessages = (chat.messages.length - count) || (chat.messages.length - 10);

            if (!chatInstans && !this.defaultInstansChat) throw new Error('Don\'t choose chat');
                for (var i = chat.messages.length - 1; i >= countMessages; i--) {
                        if (chat.messages[i].whoRead.indexOf(this) != -1) {
                            countMessages--;
                            continue;
                        }
                    console.log('[' + chat.messages[i].user.name + ']' + '{connect: ' + chat.checkConnect(chat.messages[i].user) + '} [' + chat.messages[i].timeLog() + '] message: ' + chat.messages[i].message);
                    chat.messages[i].readMessage(this);

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


function test() {
    var chat1 = new ChatHistory('chat1');
    var chat2 = new ChatHistory('chat2');
    var user1 = new User('kate');
    var user2 = new User('pasha');
    var user3 = new User('lena');
    chat1.addUser(user1, user2, user3);
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
    chat1.sendMessage(user3, 'how are you?6');
    chat1.sendMessage(user3, 'Fine6');

    console.log(chat1.usersWhoConnect);
    chat1.showUsersUnreadMessage(user3, 3);
    console.log('-----------------');
    chat1.showUsersUnreadMessage(user3, 3);
    console.log('----------------------------');
    user3.showUnreadMessage(chat1, 1);
    console.log('----------------------------');
    console.log(chat1.messages);
    chat1.showHistory();
    chat1.deleteUser(user2, user3);
    console.log(chat1.usersWhoConnect);
    chat1.showHistory();
    user1.chooseDefaultChat(chat2);
    user1.chooseChat();
    user2.chooseChat(chat2);
    console.log('----------------------------');
    console.log(chat2.usersWhoConnect);
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