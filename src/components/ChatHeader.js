import { EditLocation, HelpRounded, NotificationsActive, PeopleAltRounded, SearchRounded, SendRounded } from '@material-ui/icons'
import React from 'react'

import "./ChatHeader.css"
function ChatHeader({channelName}) {
   
    return (
        <div className="chatHeader">
            <div className="chatHeader_left">
                <h3>
                    <span className="chatHeader_hash">
                        #
                    </span>
                    {channelName}
                </h3>

            </div>
            <div className="chatHeader_right">
                <NotificationsActive/>
                <EditLocation/>
                <PeopleAltRounded/>
                <div className="chatHeader_search">
                    <input placeholder="Search"/>
                    <SearchRounded/>
                </div>
                <SendRounded/>
                <HelpRounded/>


            </div>
            
        </div>
    )
}

export default ChatHeader
