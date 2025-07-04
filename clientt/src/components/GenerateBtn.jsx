import { motion } from 'framer-motion';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const GenerateBtn = () => {

  const {user, setShowLogin} = useContext(AppContext)
  const navigate = useNavigate()

  const onClickHandler = ()=>{
    if(user){
      navigate('/result')
    }else{
      setShowLogin(true)
    }
  }

  return (
    <motion.div 
    initial={{opacity: 0.2, y:100}}
    transition={{duration: 1}}
    whileInView={{opacity:1, y:0}}
    viewport={{once: true}}
    className='pb-12 text-center'>
      <h1 className='text-2xl md:text-3xl lg:text-2xl mt-2 font-semibold text-neutral-800 py-2'>
        See the magic. Try now
      </h1>

      <button onClick ={onClickHandler} className='mt-2 inline-flex items-center gap-2 px-8 py-2 rounded-full bg-black text-white m-auto hover:scale-105 transition-all duration-500'>
        Generate
        <img src={assets.star_group} alt="Star" className='h-5' />
      </button>
    </motion.div>
  );
}

export default GenerateBtn;