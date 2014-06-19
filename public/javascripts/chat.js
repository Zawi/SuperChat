window.onload = function() {

    var messages = [];
    var socket = io.connect('http://localhost:3000');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<div class="chat-message"><span class="chat-name">' + (messages[i].username ? messages[i].username : 'Server') + '</span>';
                html += messages[i].message + '</div>';
            }
            content.innerHTML = html;
            content.scrollTop = content.scrollHeight;
            field.value = '';
        } else {
            console.log("There is a problem:", data);
        }
    });

    sendButton.onclick = function(event) {
        event.preventDefault();
        if(name.value == "") {
            alert("Please type your name!");
        } else {
            var text = field.value;
            socket.emit('send', { message: text, username: name.value });
        }
    };
}
