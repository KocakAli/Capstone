import { useEffect, useState } from 'react'
import {AiOutlineUserAdd, AiOutlineUser} from 'react-icons/ai'
import {GiAnvilImpact} from 'react-icons/gi'
import{Link} from 'react-router-dom'
import  Modal  from 'react-modal';
import {GrClose} from 'react-icons/gr'
import '../App.css';
import {AiOutlinePlus,AiOutlineAlignLeft} from 'react-icons/ai'
import {IoIosLogOut} from 'react-icons/io'

Modal.setAppElement('#root')
function Header({user, setUser}) {
    const[open, setOpen] = useState(false)
    const[rOpen, rSetOpen] = useState(false)
    const[nOpen, nSetOpen] = useState(false)
    const[story, setStory] = useState({
        title:'',
        story:'',
        cat:'',
        message:''

    })
    const[categories,setCategories] = useState(null)
    const[login, setLogin] = useState({
        username:'',
        password:'',
        message:''
    })
    const[register, setRegister] = useState({
        username:'',
        email:'',
        password:'',
        confirmation:'',
        message:'',
    })
    const[isLogged, setLogged]= useState(false)
    

    useEffect(()=>{
        if(localStorage.getItem('user')){
            setUser(localStorage.getItem('user'))
            setLogged(true)
        }
    })
    
    useEffect(() => {
        fetch('http://127.0.0.1:8000/categories')
        .then(response => {return response.json()})
        .then(data => {setCategories(data.categories)})
        
        
      }, [])

    const nav ={
        'height':'45px',
    }
    const navlinks={
        'textDecoration':'none',
        'cursor':'pointer'
    }
    const title={
        "fontFamily": "Garamond, serif"
    }

    const ntitle={
        'height':'45px'
    }
    const nstory={
        'height':'200px'
    }
    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)

    const handleSubmit = e =>{
        e.preventDefault()
        fetch('http:///localhost:8000/signup',{
          method:'POST',
          body:JSON.stringify({
            username:register.username,
            password:register.password,
            confirmation:register.confirmation,
            email:register.email,
          }),
          headers:{
            'Accept':'application/json',
            'Content-type': 'application/json; charset=UTF-8'
          }
        }).then((res)=>{
          return res.json()
        }).then(data => {
          console.log(data)
          if(data.success){localStorage.setItem('user',data.user);setLogin({...register,message:""});window.location.replace('/')}
          if(data.message){setRegister({
            username:"",
            password:"",
            email:"",
            confirmation:"",
            message:data.message
            
          })}
      
        })
    }



    function lForm(e){
        e.preventDefault()
        fetch('http:///localhost:8000/login',{
          method:'POST',
          body:JSON.stringify({
            username:login.username,
            password:login.password
          }),
          headers:{
            'Accept':'application/json',
            'Content-type': 'application/json; charset=UTF-8'
          }
        }).then((res)=>{
          return res.json()
        }).then(data => {
          console.log(data)
          if(data.success){localStorage.setItem('user',data.user);setLogin({...login,message:""});window.location.replace('/')}
          if(data.message){setLogin({
            username:"",
            password:"",
            message:data.message
            
          })}
      
        })
      }
    
      function sSubmit(e){
        e.preventDefault()
      
        
        fetch('http://127.0.0.1:8000/article',{
          method:'POST',
          body:JSON.stringify({
            title:story.title,
            story:story.story,
            cat:story.cat,
            user:localStorage.getItem('user')
          }),
          headers:{
            'Accept':'application/json',
            'Content-type': 'application/json; charset=UTF-8'
          }
        }).then(res =>{return res.json()})
        .then(data => {alert(data.message);if(data.message ==='success'){window.location.replace('/')}})
        
       
      }

      function logout(){
          fetch('http://127.0.0.1:8000/logout',{
            headers:{
                'Accept':'application/json',
                'Content-type': 'application/json; charset=UTF-8'
              }
          }).then(res => {return res.json()})
          .then(data => {console.log(data); localStorage.removeItem('user'); setUser(''); setLogged(false); window.location.replace('/')})
      }
      
    return (
        <div  className='h bg-dark text-light'>
            <div style={nav} className='container-fluid d-flex align-items-center justify-content-between'>  
                <Link to='/' className=' d-flex  fs-4 nav-link text-light'>
                    <AiOutlineAlignLeft className='hs'/>
                    <div className='px-2 fst'>
                        Plus1
                    </div>     
                </Link>
                <div className='d-flex'>
                    <div  onClick={() => {
                        if(localStorage.getItem('user')){
                            nSetOpen(true)
                            setStory({
                                ...story,
                                message:''
                            })
                        }else{
                            setOpen(true)
                            setStory({
                                ...story,
                                message:'You must be logged in to write'
                            })
                        }
                        
                        }
                        } className='px-1 d-flex'>
                        <div className='fs'>
                            <AiOutlinePlus />
                        </div>
                        <div style={navlinks} className='fs' to='/newStory'>
                            Write
                        </div>
                    </div>
                    {isLogged && <div onClick={logout} className='fs px-1 pot d-flex'>
                        <div>
                            <IoIosLogOut />
                        </div>
                        <div>
                            Logout   
                        </div>
                         
                    </div>}
                    {!isLogged &&
                    <>    
                    <div className='px-1'>
                        <div onClick={() => {openModal();setStory({
                                ...story,
                                message:''
                            })}} style={navlinks} className='d-flex px-1 text-light'  >
                            <div className='fs'>
                                <AiOutlineUser />
                            </div>
                            <div className='fs'>
                                Login
                            </div> 
                        </div>
                    </div>
                    <div className='px-1'>
                        <div onClick={()=> {rSetOpen(true);setStory({
                                ...story,
                                message:''
                            })}} 
                            style={navlinks} className='d-flex px-1 text-light' to='#' >
                            <div className='fs'>
                                <AiOutlineUserAdd />  
                            </div>
                            <div className='fs me-2'>
                                Register
                            </div>  
                        </div>
                    </div> 
                    </>       
                    }
                    
                </div>           
            </div>


            {/* Modal for Login */}
            <Modal isOpen={open}  onRequestClose={()=> setOpen(false)}>
                <div className='d-flex flex-column'>
                    <div  onClick={() => setOpen(false)} className='d-flex mb-2 justify-content-end'>
                        <GrClose style={navlinks}/>
                    </div>
                    <form onSubmit={lForm}>
                        <div className='d-flex mt-5 align-items-center flex-column '>
                            <div>
                                <p style={title} className='fs-1 fw-bold'>Welcome to Hard again.</p>
                            </div>
                            {login.message && 
                            <div>
                                <p style={title} className='fs-6 fw-bold'>{login.message}</p>
                            </div>
                            }
                            <input onChange={(e)=> setLogin({...login,username:e.target.value})} value={login.username} style={title} className='tinput mt-3 fw-bold' autoFocus autoComplete='off' type='text' placeholder='Username' name='username'></input>
                            <input onChange={(e)=> setLogin({...login,password:e.target.value})} value={login.password} style={title} className='tinput mt-1 fw-bold' autoComplete='off' type='password' placeholder='Password' name='password'></input>
                            <button  className='btn btn-primary mt-1' type='submit'>Login</button>
                            <p style={title} className='lead mt-3 '>No account? <span onClick={()=> {setOpen(false);rSetOpen(true)}} style={navlinks} className='a'>Create one</span></p>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Modal for Register */}
            <Modal isOpen={rOpen} onRequestClose={()=> rSetOpen(false)}>
                <div className='d-flex flex-column'>
                    <div  onClick={() => rSetOpen(false)} className='d-flex mb-2 justify-content-end'>
                        <GrClose style={navlinks}/>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='d-flex mt-5 align-items-center flex-column '>
                            <div>
                                <p style={title} className='fs-1 fw-bold'>Welcome to Hard</p>
                            </div>
                            {register.message && <div>
                                {register.message}
                            </div>}
                            <input onChange={(e)=> setRegister({...register,username:e.target.value})} value={register.username} style={title} className='tinput mt-3 fw-bold' autoFocus autoComplete='off' type='text' placeholder='Username' name='username'></input>
                            <input onChange={(e)=> setRegister({...register,email:e.target.value})} value={register.email} style={title} className='tinput mt-1 fw-bold'  autoComplete='off' type='text' placeholder='E-Mail' name='email'></input>
                            <input onChange={(e)=> setRegister({...register,password:e.target.value})} value={register.password} style={title} className='tinput mt-1 fw-bold' autoComplete='off' type='password' placeholder='Password' name='password'></input>
                            <input onChange={(e)=> setRegister({...register,confirmation:e.target.value})} value={register.confirmation} style={title} className='tinput mt-1 fw-bold' autoComplete='off' type='password' placeholder='Password Again' name='confirmation'></input>
                            <button  className='btn btn-primary mt-1' type='submit'>Register</button>
                            <p style={title} className='lead mt-3 '>Already have account? <span onClick={()=> {setOpen(true);rSetOpen(false)}} style={navlinks} className='a'>Login</span></p>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Modal for Story     */}            
            <Modal isOpen={nOpen} onRequestClose={()=> nSetOpen(false)}>
                <div className='d-flex flex-column'>
                    <div  onClick={() => nSetOpen(false)} className='d-flex mb-2 justify-content-end'>
                        <GrClose style={navlinks}/>
                    </div>
                    <form onSubmit={sSubmit}>
                        <div style={title} className='d-flex mt-3  flex-column '>
                            <div>
                                <p style={title} className='fs-1 fw-bold'>Create your own Story</p>
                            </div>
                            <textarea onChange={(e)=> setStory({...story,title:e.target.value})} style= {ntitle} value={story.title} className='textarea mt-3 fw-bold' autoFocus  type='text' placeholder='Write your title here' name='title'></textarea>
                            <textarea onChange={(e)=> setStory({...story,story:e.target.value})} style= {nstory} value={story.story} className='textarea mt-1 fw-bold'  type='text' placeholder='Write your Story here' name='story'></textarea>
                            <div className='d-flex align-items-center flex-column'> 
                                
                                <select onChange={(e)=> setStory({...story,cat:e.target.value})} className='tinput mt-1 fw-bold' name="category">
                                    <option selected disabled>Select a Category</option>
                                        {categories && categories.map((category) =>(
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                    ))}
                                </select>
                                <input className='mt-2'type='submit' value='submit'></input>
                            </div>
                            
                        </div>
                    </form>
                </div>
            </Modal>
            
        </div>
    );
}

export default Header;