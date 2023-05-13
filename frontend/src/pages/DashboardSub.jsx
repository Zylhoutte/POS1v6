import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Out from 'components/Out'
import MiniDrawer from 'components/MiniDrawer'










function Dashboardsub() {
  
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

  
  

  



<MiniDrawer/>


   

    

    
    
    </>
  )
}

export default Dashboardsub