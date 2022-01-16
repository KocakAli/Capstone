import React, { useEffect, useState } from 'react';
import{useParams} from 'react-router-dom'
import{MdOutlinePlusOne} from 'react-icons/md'

import Comment from './Comment'


function Storypage({r, setR}) {

    const [story, setStory] = useState(null)
    const [user, setUser] = useState('')
    const {id} = useParams()
    const style={
        'paddingLeft':'100px',
        'paddingRight':'100px'
    }
    useEffect(()=>{
        setTimeout(() =>{
            setUser(localStorage.getItem('user'))
            fetch(`http://127.0.0.1:8000/getStory/${id}`,{
                method:'POST',
                body:JSON.stringify({
                    user:localStorage.getItem('user')
                }),
                headers:{
                    'Accept':'application/json',
                    'Content-type': 'application/json; charset=UTF-8'
                }
                }).then(res =>{return res.json()})
                .then(data => {console.log(data.story); setStory(data.story)}) 
        },500)
        
    },[r])

    function like(id){
        console.log(id)
        console.log(id)
        fetch('http://127.0.0.1:8000/like',{
            method:'POST',
            body:JSON.stringify({
                story_id: id,
                user:user
            })
        })
        setR(!r)
    }
    return (
        <>
            <div className='container'>
                {story && story.map((s) =>(
                    <div key={s.id} className='container'>
                        <div className='mt-3 d-flex align-items-center bbt'>
                            <div className='fw-bold fs-1 me-auto'>
                            {s.username}
                            </div>
                            <div className='fss pot me-3' onClick={() => like(s.id)}>
                                <MdOutlinePlusOne   size={20}/>
                            </div>
                            <div className='fs me-3' >
                                View: {s.view}
                            </div>
                            <div className='me-3 fs'>
                                Plus1: {s.like}
                            </div>
                            <div className= 'fs'>
                                {s.time.split(',')[0]}
                            </div>   
                        </div>
                        <div className='container-fluid mt-5'> 
                                <div className='fs-2 d-flex justfiy-content-center fw-bold'>
                                    <div>
                                        {s.title}
                                    </div>
                                    
                                </div>                     
                                <div className='mt-5 fss'>
                                    {s.article}
                                </div>                    
                        </div>
                        <Comment id={s.id} r={r} setR={setR}/>
                    </div>
                    
                ))    
                }
            </div>
            
        </>
        
    );
}

export default Storypage;