import './loader.css'
import React from 'react';
import { useEffect, useState } from 'react';
import gsap from 'gsap';

function Loader(){

    const [counter, setCounter] = useState(100);

    setTimeout(()=>{
        if(counter > 0){
            setCounter(counter - 1);
        }else{
            setCounter(0);
            gsap.to('.loadtxt',{
                opacity: 0,
                duration: 0.3
            })
            gsap.to('.loader',{
                width: 0,
                duration: 0.4,
            })
        }
   }, 25) 

    return(
        <>
            <div className="loader fixed flex justify-center items-center">
                <p className='loadtxt text-xl text-slate-300'>{counter}</p>
            </div>
        </>
    )
}

export default Loader;