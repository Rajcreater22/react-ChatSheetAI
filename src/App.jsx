import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Url } from './Api'
import Recentsearch from './components/Recentsearch';
import Qustionanswer from './components/Qustionanswer'

function App() {

  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(JSON.parse(localStorage.getItem('history')));
  const [selectedHistory, setSlectedHistroy] = useState('');
  const scrollToAns = useRef();;
  const [loader, setLoader] = useState(false);

  const askQuestion = async () => {

    if (!question && !selectedHistory) {
      return false
    }

    if (question) {
      if (localStorage.getItem('history')) {
        let history = JSON.parse(localStorage.getItem('history'));
        history = [question, ...history]
        localStorage.setItem('history', JSON.stringify(history))
        setRecentHistory(history)
      } else {
        localStorage.setItem('history', JSON.stringify([question]))
        setRecentHistory([question])
      }
    }

    const payloadData = question ? question : selectedHistory;
    const payload = {
      "contents": [{
        "parts": [{ "text": payloadData }]
      }]
    }

    setLoader(true);

    let response = await fetch(Url, {
      method: "POST",
      body: JSON.stringify(payload)
    })

    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim());

    setResult([...result, { type: 'q', text: question ? question : selectedHistory }, { type: 'a', text: dataString }]);

    setQuestion('');

    setTimeout(() => {
      scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
    }, 500);

    setLoader(false);
  }

  const isEnter = (e) => {
    if (e.key == 'Enter') {
      askQuestion(question);
    }
  }

  useEffect(() => {
    console.log(selectedHistory);
    askQuestion();
  }, [selectedHistory])

  const [darkMode, setDarkMode] = useState('dark');
  useEffect(() => {
    if (darkMode == 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className={darkMode == 'dark' ? 'dark' : 'light'}>
      <div className='grid grid-cols-5 text-center h-screen'>
        <div className="fixed text-white right-0 p-2">
          <select onChange={(event) => setDarkMode(event.target.value)} typeof='checkbox' className='outline-none dark:text-white text-black'>
            <option className='text-black' value="dark">Dark</option>
            <option className='text-black' value="light">Light</option>
          </select>
        </div>
        <Recentsearch recentHistory={recentHistory} setRecentHistory={setRecentHistory} setSlectedHistroy={setSlectedHistroy} />
        <div className='col-span-4 p-10 '>
          <h1 className='dark:text-zinc-300'>Hello! User ask me anthink you want</h1>
          <div ref={scrollToAns} className='container h-140  overflow-scroll' style={{ scrollbarWidth: 'none' }}>
            {
              loader ? <div className="flex items-center justify-center">
                <svg className="w-12 h-12 animate-spin" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#3B82F6"
                    strokeWidth="10"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset="75"
                  />
                </svg>
              </div>
                : null
            }
            <div className='dark:text-zinc-300'>
              <ul>
                {result.map((item, index) => (
                  <Qustionanswer key={index} item={item} index={index} />
                ))}
              </ul>
            </div>
          </div>
          <div className='flex dark:bg-zinc-800 w-1/2 p-1 pr-5 dark:text-white m-auto rounded-4xl border border-zinc-700'>
            <input type="text" value={question} onKeyDown={isEnter} onChange={(event) => setQuestion(event.target.value)} className='w-full h-full p-3 outline-none' placeholder='Ask me anythink' />
            <button onClick={askQuestion} className='cursor-pointer'>Ask</button>
          </div>
        </div>
      </div >
    </div>
  )
}

export default App