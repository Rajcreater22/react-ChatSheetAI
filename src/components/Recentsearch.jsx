import React from 'react'
import { MdDeleteForever } from 'react-icons/md';

function Recentsearch({ recentHistory, setRecentHistory, setSlectedHistroy }) {

    const clearHistory = () => {
        localStorage.clear();
        setRecentHistory([])
    }

    return (
        <div>
            <div className='col-span-1 dark:bg-zinc-800 h-full bg-[#f9f9f9f9]' >
                <h1 className='dark:text-white text-3xl pt-5' >React AI Tool</h1>
                <div className='flex justify-center'>
                    <h1 className='dark:text-white text-2xl p-5'>Resent History</h1>
                    <button onClick={clearHistory} className='dark:text-white text-2xl cursor-pointer'><MdDeleteForever /></button>
                </div>
                <ul className='flex flex-col text-left overflow-auto'>
                    {
                        recentHistory && recentHistory.map((item, index) => (
                            <li key={index} onClick={() => setSlectedHistroy(item)} className='p-1 pl-5 truncate dark:text-zinc-400 cursor-pointer dark:hover:bg-zinc-700 dark:hover:text-zinc-200 hover:bg-white'>{item}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Recentsearch