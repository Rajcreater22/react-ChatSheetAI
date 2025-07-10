// import React from 'react'
// import { IoIosMenu } from 'react-icons/io'
// import { MdDeleteForever } from 'react-icons/md'

// function sidebar() {
//     return (
//         <div className={`col-span-1 bg-zinc-800 ${expanded ? 'w-[100%] px-3 pb-3' : 'w-[100px] px-3 '}`} onClick={toggleSidebar}>
//             <IoIosMenu className='text-white' />
//             <h1 className={`text-white text-3xl pt-5`} >React AI Tool</h1>
//             <div className='flex justify-center'>
//                 <h1 className='text-white text-2xl p-5'>Resent History</h1>
//                 <button onClick={clearHistory} className='text-white text-2xl cursor-pointer'><MdDeleteForever /></button>
//             </div>
//             <ul className='flex flex-col text-left overflow-auto'>
//                 {
//                     recentHistory && recentHistory.map((item) => (
//                         <li onClick={() => setSlectedHistroy(item)} className='p-1 pl-5 truncate text-zinc-400 cursor-pointer hover:bg-zinc-700 hover:text-zinc-200'>{item}</li>
//                     ))
//                 }
//             </ul>
//         </div>
//     )
// }

// export default sidebar