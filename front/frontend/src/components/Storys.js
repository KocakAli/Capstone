import React, { useEffect, useState } from 'react';
import {GrLinkNext,GrLinkPrevious} from 'react-icons/gr'
import{MdOutlinePlusOne} from 'react-icons/md'
import{Link} from 'react-router-dom'
function Storys({r, setR}) {
    const [state, setState] = useState({
        order:'time',
        
    })
    const[storys, setStory] = useState(null)
    const[pageNum,setPageNum] = useState(1)
    const[maxPage,setMaxPage] = useState(null)
    const[user,setUser] = useState('')
    useEffect(()=>{
        if(localStorage.getItem('user')){
            setUser(localStorage.getItem('user'));
        }
    })

    const f={
        "fontFamily": "Garamond, serif"
    }
    const s={
        'width':'60%'
    }
    useEffect(() => {
        setTimeout(()=>{
           fetch(`http://127.0.0.1:8000/get/${pageNum}`,{
          method:'POST',
          body:JSON.stringify({
            order:state.order,
            user:localStorage.getItem('user')
          }),
          headers:{
            'Accept':'application/json',
            'Content-type': 'application/json; charset=UTF-8'
          }
        }).then(res =>{return res.json()})
        .then(data => {console.log(data); setStory(data.articles);setMaxPage(data.maxPage)}) 
        },500)
        
         
      }, [state.order, pageNum, r])

    function next(){
        if(pageNum >= maxPage){
            alert('You are looking last page')
        }else{
            window.scrollTo(0, 0);
            setPageNum(pageNum+1)
        }
        
    }
    function pre(){
        if(pageNum == 1){
            alert('You are looking first page')
        }else{
            window.scrollTo(0, 0);
            setPageNum(pageNum-1)
        }
        
    }

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

    function storyp(id){
        
    }
    function view(id){
        fetch('http://127.0.0.1:8000/view',{
            method:'POST',
            body:JSON.stringify({
                story_id: id,
                user:user
            })
        })
        setR(!r)
    }

    const style={
        'textDecoration':'none',

    }

    return (
        <div className=' container mt-2 mb-5'>
            <div className='d-flex flex-column align-items-center'>
                <div className='d-flex justify-content-center'>
                    <label htmlFor="order" style={f}  className='mx-2 ob fw-bold'>Order by:</label>
                    <select onChange={(e) => setState({...state,order:e.target.value})} name='order' id='order' className='tinput fssi'>
                        <option className='fssi' value='time'>Chronological</option>
                        <option className='fssi' value='view'>Most Viewed</option>
                        <option className='fssi' value='like'>Most Liked</option>
                    </select>
                </div>
                <div style={s} className='d-flex flex-column mt-2'>
                    {storys && storys.map((story)=>(
                        <div onClick={() => storyp(story.id)} key={story.id} className=' d-flex flex-column align-items-start container mt-5 bbs'>
                            <div className='container-fluid pe-0 ps-0'>
                                <div className='fss d-flex justify-content-between'>
                                    <div className=''>
                                        {story.time.split(',')[0]}
                                    </div>
                                    <div className='fss pot' onClick={() => like(story.id)}>
                                        <MdOutlinePlusOne   size={20}/>
                                    </div>
                                    
                                    
                                </div>
                            </div>
                            
                            <div>
                                <div className='fw-bold p fs d-flex align-items-start p'>{story.title}</div>
                            </div>
                            <div>
                                <div className='fss pt'>
                                    {story.article.length >85 ?`${story.article.substring(0,85)}...`:story.article} <Link onClick={()=> view(story.id)} style={style} to={`/story/${story.id}`}>Read More</Link>
                                </div>
                            </div>
                            <div className='container-fluid pe-0 ps-0'>
                                <div className='d-flex mt-3  '>
                                    <div className='fss me-auto br'>
                                        Written by: {story.username}
                                    </div>
                                    <div className='br px-1'>
                                        Category: {story.catname}
                                    </div>
                                    <div className='br px-1'>
                                        View: {story.view}
                                    </div>
                                    <div className='d-flex'>
                                        
                                        <div className='br'>
                                            Plus1: {story.like}
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                            </div>
                            
                            
                        </div>
                    ))}
                    

                </div>
                <div className='mt-5 d-flex justify-content-center mb-5'>
                    <div className='d-flex pot fs fw-bold me-5' onClick={pre}>
                        <div><GrLinkPrevious className='me-2'/></div>
                        <div>Previous</div>
                        
                    </div>
                    <div className='d-flex pot fs fw-bold ms-5' onClick={next}>
                        <div className='me-2'>Next</div>
                        <div><GrLinkNext /></div>
                    </div>
                     
                </div>
            </div>
        </div>
    );
}

export default Storys;