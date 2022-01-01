import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/Auth";
import { EventList } from "../calendar/EventList";
import { useNavigate } from 'react-router-dom';
export function ShowEvents () {
    const { signed } = useContext(AuthContext);
    const navigate = useNavigate()
    useEffect(()=>{
        if(!signed){
            navigate("/sign-in")
        }
    }, [])
    
    return <EventList />
}