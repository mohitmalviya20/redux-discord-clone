import { AddCircle, EmojiEmotions, Gif,CardGiftcard } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import "./Chat.css"
import ChatHeader from './ChatHeader'
import Message from './Message'
import { useSelector } from 'react-redux'
import { ChannelName, selectChannelId } from '../features/appSlice'
import { selectUser } from '../features/userSlice'
import db from './firebase';
import firebase from "firebase"

function Chat() {
    const user=useSelector(selectUser)
    const channelId = useSelector(selectChannelId)
    const channelName= useSelector(ChannelName)
    const [input, setInput]= useState("")
    const [messages, setMessages]= useState([])


    useEffect(()=>{
        if(channelId){
            db.collection('channels')
            .doc(channelId)
            .collection("messages")
            .orderBy('timestamp','asc')
            .onSnapshot(snapshot=>setMessages(snapshot.docs.map(doc=>doc.data())))
        }
    },[channelId])

    const sendMessages =(e)=>{
        e.preventDefault()
        db.collection('channels').doc(channelId).collection("messages").add(
            {
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                message:input,
                user:user,

            }
        )
        setInput("")
    }
    return (
        <div className="chat">
            <ChatHeader channelName={channelName}/>
            <div className="chat_messages">
                {
                    messages.map((message)=>(
                        <Message 
                        timestamp={message.timestamp}
                        message={message.message}
                        user={message.user}
                        />


                    ))
                }
            </div>
            <div className="chat_input">
                <AddCircle fontSize="large"/>
                <form>
                    <input type="text" placeholder={`Message # ${channelName}`} value={input} onChange={(e)=>setInput(e.target.value)} disabled={!channelId}/>
                    <button  disabled={!channelId} className="chat_inputButton" type="submit" onClick={sendMessages}>send message</button>
                </form>
                <div className="chat_inputIcons">
                    <CardGiftcard fontSize="large"/>
                    <Gif fontSize="large"/>
                    <EmojiEmotions fontSize="large"/>
                </div>

            </div>
            
        </div>
    )
}

export default Chat
