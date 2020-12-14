import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const SideNav = ({onHandle}) => {
    const [opt, setOpt] = useState(0);
    const location = useLocation().pathname;

    useEffect(()=>{
        if(location.indexOf('/profile') !== -1)
        {
            setOpt(3);
        }
    }, [])

    useEffect(()=>{
        onHandle(opt);
    }, [opt])

    return (
            location.indexOf('/profile') !== -1 ?
            <div class="col-lg-3">
            <h1 class="my-4">My Info</h1>
            <div class="list-group">
                <Link onClick={()=>setOpt(3)} class={opt===3?"list-group-item active":"list-group-item"}>My Info</Link>
                <Link onClick={()=>setOpt(4)} class={opt===4?"list-group-item active":"list-group-item"}>My Articles</Link>
                <Link onClick={()=>setOpt(5)} class={opt===5?"list-group-item active":"list-group-item"}>Likes</Link>
                <Link onClick={()=>setOpt(6)} class={opt===6?"list-group-item active":"list-group-item"}>Info Change</Link>
            </div>
            </div>
            :
            <div class="col-lg-3">
            <h1 class="my-4">Article Lists</h1>
            <div class="list-group">
                <Link onClick={()=>setOpt(0)} class={opt===0?"list-group-item active":"list-group-item"}>All</Link>
                <Link onClick={()=>setOpt(1)} class={opt===1?"list-group-item active":"list-group-item"}>Major</Link>
                <Link onClick={()=>setOpt(2)} class={opt===2?"list-group-item active":"list-group-item"}>Dream</Link>
            </div>
            </div>
    )
}
export default SideNav;