import React from 'react'
import { useDispatch } from 'react-redux'
import { SetChannelInfo } from '../features/appSlice'
import "./SidebarChannel.css"
function SidebarChannel({id, channelName}) {
    const dispatch= useDispatch()
    return (
        <div className="sidebarChannel"
        
        onClick={
            ()=>(

                dispatch(SetChannelInfo(
                    {
                        channelId:id,
                        channelName:channelName,
                    }
                ))


            )
        }
        
        >
            <h4>
                <span className="sidebarChannel_hash">#</span> {channelName}
            </h4>
        </div>
    )
}

export default SidebarChannel
