import React, { useEffect, useState } from 'react';
import {BiTrendingUp} from 'react-icons/bi'
import {BsHeart, BsArrowRightCircleFill, BsArrowLeftCircleFill} from 'react-icons/bs'
import Slider from "react-slick";
import{MdOutlinePlusOne} from 'react-icons/md'
import{Link} from 'react-router-dom'

function Trends({r, setR}) {
    const[trends, setTrends] = useState(null)
    const[user,setUser] = useState('')
    
    useEffect(()=>{
        if(localStorage.getItem('user')){
            setUser(localStorage.getItem('user'));
        }
    })
    useEffect(() => {
        fetch('http://127.0.0.1:8000/')
        .then(response => {return response.json()})
        .then(data => {setTrends(data.storys_j);console.log(data.storys_j)})
        
        
      }, [r])
    const title={
        "fontFamily": "Garamond, serif"
    }
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 4000,
        nextArrow: <BsArrowRightCircleFill size={32}/>,
        prevArrow: <BsArrowLeftCircleFill />
      };

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

    const style={
        'textDecoration':'none',

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
    return (
        <div className='container mt-5'>
            <div className='d-flex flex-column'>
                <div className='d-flex'>
                    <BiTrendingUp size={20}/>
                    <p style={title} className='fw-bold tfs px-2'>TRENDING ON PLUS1</p>
                </div>
                <div className='container'>
                    <div>
                        
                        <Slider  className='mb-5 b' {...settings}>
                        {trends && trends.map((trend)=>{
                            return(
                                    <div  className='d-flex justify-content-center flex-column flex-wrap 'key={trend.id}>
                                        <div className='d-flex flex-column align-items-center flex-wrap '>
                                            <div>
                                                <div className='fw-bold fs p px-5 pt-2'>{trend.title}</div>
                                            </div>
                                            <div >
                                                <div className='p fss pt mb-3'>
                                                    {trend.article.length >150 ?`${trend.article.substring(0,150)}...`:trend.article}<Link onClick={()=> view(trend.id)} style={style} to={`/story/${trend.id}`}>Read More</Link>
                                                </div>
                                                
                                            </div>
                                            
                                        </div>
                                        <div className='container pe-0 ps-0'>
                                            <div className='d-flex mt-3  mx-5'>
                                                <div className='fss me-auto br'>
                                                    Written by: {trend.username}
                                                </div>
                                                <div className='br px-1'>
                                                    Category: {trend.catname}
                                                </div>
                                                <div className='br px-1'>
                                                    View: {trend.view}
                                                </div>
                                                <div className='d-flex'>
                                                    
                                                    <div className='br'>
                                                        Plus1: {trend.like}
                                                    </div>
                                                </div>
                                                
                                            </div>
                                         </div>
                                    </div>
                                 )
                                }
                        
                    )}
                        
                        {/* <div>
                            <h3>1</h3>
                        </div>
                        <div>
                            <h3>{}</h3>
                        </div>
                        <div>
                            <h3>2</h3>
                        </div>
                        <div>
                            <h3>3</h3>
                        </div>
                        <div>
                            <h3>4</h3>
                        </div>
                        <div>
                            <h3>5</h3>
                        </div>
                        <div>
                            <h3>6</h3>
                        </div> */}
                    </Slider>
                    </div>





                    {/* <div className='d-flex flex-wrap'>
                {trends && trends.map((trend) =>(       
                        <div className='d-flex flex-column  mx-5  mt-5 f'>
                            <div>User: {trend.username}</div>
                            <div className='max-lines'>{trend.title.length >25 ?`${trend.title.substring(0,25)}...`:trend.title}</div>
                        </div>        
                        ))}
                    </div> */}
                    {/* <div className='row'> 
                        {trends && trends.map((trend) =>(
                            <div className='col-sm-6 col-md-4 col-lg-4 mt-3' key={trend.id}>
                                <div className='mx-3 '>
                                    <div className='row'>
                                        {trend.username}
                                    </div>
                                    <div className='row fw-bold fs-6 max-lines'>
                                        {trend.title.length >25 ?`${trend.title.substring(0,25)}...`:trend.title}
                                    </div>
                                    <div className='row'>
                                        <div className='col tsb'>
                                            {trend.time}
                                        </div>

                                    </div>
                                </div>
                                
                                                             
                                </div>
                        ))}
                    </div> */}
                    
                </div>
            </div>
            
        </div>
    );
}

export default Trends;