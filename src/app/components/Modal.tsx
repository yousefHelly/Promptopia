'use client'
import { useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import NavLogin from './NavLogin'

export default function Modal ({state, setState}:ModalProps){
  useEffect(()=>{
    addEventListener('resize',(e)=>{
      if(window.innerWidth>767){
        setState(false)
      }
    })
  })
  return (
    <AnimatePresence mode='wait'>{
      state&&
      <Dialog
      static
      as={motion.div}
      open={state}
      className='fixed w-full h-full inset-0 bg-slate-500/25 backdrop-blur-sm z-40'
      onClose={() => setState(!state)}
    >
      <Dialog.Panel>
        <motion.div initial={{x:'10vh'}} animate={{x:0}} exit={{x:'100%'}} className='absolute bg-slate-100 right-0 h-screen top-0 w-60 flex py-16'>
          <div className='w-full flex flex-col px-3 justify-center gap-5'>
          <NavLogin setState={setState}/>
          </div>
        </motion.div>
      </Dialog.Panel>
    </Dialog>
      }
    </AnimatePresence>
  )
}