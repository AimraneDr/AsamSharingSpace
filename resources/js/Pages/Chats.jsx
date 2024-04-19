import ChatroomListItem from "@/Components/Chats/ChatroomListItem";
import Chatroom from "@/Components/Chats/chatroom";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
/*

    var ably = new Ably.Realtime('pass your API KEY HERE'); //remember to pass your ably API key
    var channel = ably.channels.get('chatting'); // here i create a channel or initialize the existing channel
    var messagesDiv = document.getElementById('messages');
    var senderName = document.getElementById('senderName'); //get a sender name
    var messageInput = document.getElementById('messageInput'); //get the message body
    // then subscribe to an event from the channel(here my channel is called "chat")
    // by subscribing to channel event means you listen to any event and receive any message from that channel
    channel.subscribe('messageEvent', function(message) { // message this is message from channel
        // Handle incoming messages (create a message body div tag)
        var messageElement = document.createElement('div');
        messageElement.textContent = message.data.name + ': ' + message.data.text;
        // here i add the message content to my created div tag
        messagesDiv.appendChild(messageElement);
    });
    // for sending message to chat channel we publish the new event with the intended message
    function sendMessage() {
        var message = messageInput.value.trim(); //get the message from input
        var name = senderName.value; //get the sender name from input
        if (message !== '') { //if input message is not empty publish a message
            // Publish the message to the chat channel
            channel.publish('messageEvent', { name: name, text: message, sender: 'local' });
            
            // Clear the input field
            messageInput.value = '';
            
        }
    }

*/

export default function Chats({ user }) {
    const [currentChat, setCurrentChat] = useState();

    const onSelectChat = (e, chat) => {
        e.preventDefault();
        setCurrentChat(chat);
    };

    return (
        <Authenticated user={user}>
            <div className="z-0 flex flex-row-reverse w-full h-full">
                {/* Contact list - Chat rooms */}
                <ul className="flex flex-col h-full overflow-y-auto w-[30%] p-4 transition-all duration-200 ease-in-out">
                    {user.chats.map((c) => {
                        return (
                            <ChatroomListItem
                                chat={c}
                                user_id={user.id}
                                opened={c === currentChat}
                                onClick={onSelectChat}
                            />
                        );
                    })}
                </ul>

                <Chatroom chat={currentChat} />
            </div>
        </Authenticated>
    );
}
