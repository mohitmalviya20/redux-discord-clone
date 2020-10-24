import React, { useState,useEffect } from 'react'
import "./Sidebar.css"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';import { Add, ExitToApp, HeadsetOutlined, InfoOutlined, Mic } from '@material-ui/icons';
import { Avatar, IconButton } from '@material-ui/core';
import SidebarChannel from './SidebarChannel';
import CallIcon from '@material-ui/icons/Call';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db, { auth } from './firebase';
function Sidebar() {
    const user= useSelector(selectUser);
    const [channels, setChannels]= useState([])
    useEffect(()=>{
        db.collection('channels').onSnapshot(snapshot=>{
            setChannels(snapshot.docs.map(doc=>({
                id:doc.id,
                channel:doc.data()
            })))
        })

    },[])
    const handleAddChannel= ()=>{
        const channelName= prompt("enter channel name")
        if(channelName){
            db.collection('channels').add({
                channelName:channelName
            })
        }
    }
    console.log(channels)
    return (
        <div className="sidebar">
            <div className="sidebar_top">
                <h3>MM's Chat Room</h3>
                <ExpandMoreIcon/>
            </div>
            <div className="sidebar_channels">
                <div className="sidebar_channelHeader">
                    <div className="sidebar_header">
                        <ExpandMoreIcon/>
                        <h4>Text Channels</h4>
                    </div>
                    <IconButton onClick={handleAddChannel}>
                    <Add className="sidebar_addChannel"/>
                    </IconButton>
                </div>
                <div className="sidebar_channelsList">
                {channels.map(({id, channel})=>(<SidebarChannel key={id} id={id} channelName={channel.channelName}/>))}
            </div>
            </div>
            <div className="sidebar_voice">
                <SignalCellularAltIcon
                className="sidebar_voiceIcon"
                fontSize="large"/>
                <div className="sidebar_voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>
                <div className="sidebar_voiceIcons">
                    <InfoOutlined/>
                    <CallIcon/>
                </div>
            </div>
            <div className="sidebar_profile">
                <Avatar src={user.photo} alt="profile"/>
                <div className="sidebar_profileInfo">
                    <h3>{user.displayName}</h3>
                    <p>#{user.uid.substring(0,5)}</p>
                </div>
                <div className="sidebar_profileIcons">
                    <Mic/>
                    <HeadsetOutlined/>
                    <div onClick={()=>auth.signOut()} className="button">
                    <ExitToApp/>
                    </div>
                    

                </div>
            </div>
        </div>
    )
}

export default Sidebar
