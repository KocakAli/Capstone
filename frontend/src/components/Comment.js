import React, { useEffect, useState } from 'react';

function Comment({r, setR, id}) {
    const [cs, setComments] =useState([])
    const[c, setComment] =useState('')


    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/get_comment`,{
            method:'POST',
            body:JSON.stringify({
                id:id,
              }),
            headers:{
                'Accept':'application/json',
                'Content-type': 'application/json; charset=UTF-8'
              }
        }).then(res =>{return res.json()})
        .then(data => {console.log(data); setComments(data.comments)})
    },[r])


    function submit(){
        if(!localStorage.getItem('user')){
            return alert('You must be log in first')
        }
        fetch(`http://127.0.0.1:8000/comment`,{
          method:'POST',
          body:JSON.stringify({
            comment:c,
            id:id,
            username:localStorage.getItem('user')
          }),
          headers:{
            'Accept':'application/json',
            'Content-type': 'application/json; charset=UTF-8'
          }
        }).then(res =>{return res.json()})
        .then(data => {console.log(data);setR(!r)})
    }
    const style={
        'width' :'40%',
    }
    return (
        <div className='container pt-5 mt-5 mb-2' style={style}>
            <h5>Comments</h5>
            <div className='d-flex flex-column b'>
                <div>
                    <form className='d-flex flex-column px-2 pt-1' onSubmit={submit}>
                        <textarea value={c} onChange={(e) => setComment(e.target.value)}className='flex-fill rsn fss' placeholder=''> </textarea>
                        <button id='cmb' className='btn btn-primary mt-2 align-self-end '>Comment</button>
                    </form>   
                    <hr></hr>
                </div>
                {cs && cs.map((cs) =>(
                    <div className='d-flex flex-column p-2'>
                        <div className='fss p'>
                            {cs.comment}
                        </div>
                        <div className='fss align-self-end pe-2 p'>
                            Written by: {cs.com_username}
                        </div>
                        <hr></hr>
                    </div>
                ))}
                
            </div>
        </div>
    );
}

export default Comment;