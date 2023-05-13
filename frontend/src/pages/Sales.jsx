import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Out from 'components/Out'
import MiniDrawer2 from 'components/MiniDrawer2'










function Inventory() {
  
  const navigate = useNavigate()
  



  const {subadmin} = useSelector((state) => state.subadmin)

  

  useEffect(() => {
    
    if(!subadmin) {
      navigate('/subadmin')
    }
 
    
    return () => {
   
    }
  }, [subadmin, navigate])

 

  return (
    <>

  
  

  



<MiniDrawer2/>


   

    

    
    
    </>
  )
}

export default Inventory