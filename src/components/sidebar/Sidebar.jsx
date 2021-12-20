import { Avatar, IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import "./Sidebar.css"
import SidebarChat from './SidebarChat';
import db from '../../firebase';
import { useStateValue } from '../context/StateProvider';
import firebase from 'firebase/compat';


function Sidebar() {

    const [{user}, dispatch] = useStateValue();

    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        db.collection('rooms').onSnapshot(snapshot => {
            setRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            } )))

        })
        },[])

        // console.log(rooms)

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user.photoURL} onClick={e => firebase.auth().signOut()} />

                <div className="sidebar__headerRight">
                    
                    <IconButton> 
                    <DonutLargeIcon/>
                    </IconButton>

                    <IconButton> 
                    <ChatIcon/>
                    </IconButton>

                    <IconButton> 
                    <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
    {/* --------> div for Search part in sidebar  <-------- */}
            <div className = "sidebar__search ">
            <div className = "sidebar__searchContainer">
            <SearchIcon/>
            <input type="text" placeholder = "Search or Start a new Chat " />
            </div>
            </div>

     {/* --------> div for Chats part in sidebar <-------- */}
            <div className = "sidebar__Chats">
                <SidebarChat addNewChat/>
                {
                    rooms.map(room => {
                        return <SidebarChat key = {room.id} id = {room.id} name = {room.data.name}/>
                    })
                }
                

            </div>
        </div>
    )
}

export default Sidebar
