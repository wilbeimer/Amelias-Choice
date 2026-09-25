import { useState } from 'react'
import './App.css'


function decide(option1, option2, context, setResult) {
   fetch(`http://localhost:8000/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ option1, option2, context })
   })
      .then(response => response.json())
      .then(json => setResult(json))
      .catch(error => console.error(error));
}


function Option({name, value, onChange}) {
   let className
   let text

   if (name == "option1") {
      className = "half top"
      text = "Option 1"
   } else if (name == "option2") {
      className = "half bottom"
      text = "Option 2"
   }
   return (
      <div className={className}>
         <div className="label">{text}</div>
         <input name={name} type="text" value={value} onChange={onChange} className='option-input'/>
      </div>
   )
}

function Context({name, value, onChange}) {
   return (
      <div className='context'>
         <div className="label">(Optional) Provide Context</div>
         <input name={name} type="text" value={value} onChange={onChange} className='context-input'/>
      </div>
   )
}

function DecideButton({option1, option2, context, setResult}) {
   return (
      <button className="decide-btn" onClick={() => {decide(option1, option2, context, setResult)}}>DECIDE!</button>
   )
}

function DecisionForm({inputs, setInputs, setResult}) {

   const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setInputs(prev => ({...prev, [name]: value}));
   }


   return (
      <div className='decision-form'>
         <div className="halves">
            <Option name="option1" value={inputs.option1} onChange={handleChange}/>
            <div className="center-line"></div>
            <Option name="option2" value={inputs.option2} onChange={handleChange}/>
         </div>

         <Context name="context" value={inputs.context} onChange={handleChange}/>

         <DecideButton option1={inputs.option1} option2={inputs.option2} context={inputs.context} setResult={setResult}/>
      </div>
   )
}


function Overlay({inputs, result, setResult}) {
   return (
      <div className={result ? "overlay active" : "overlay"}>
         <div className="reveal-box">
            <div className="reveal-eyebrow">The decision is</div>
            <div className="reveal-winner">{result?.winner}</div>
            <div className="reveal-actions">
               <button className="reveal-btn primary" onClick={() => decide(inputs.option1, inputs.option2, inputs.context, setResult)}>Decide Again</button>
               <button className="reveal-btn secondary" onClick={() => setResult(null)}>Close</button>
            </div>
         </div>
      </div>
   )
}

function App() {
   const [result, setResult] = useState(null)
   const [inputs, setInputs] = useState({option1: '', option2: '', context: ''});


   // useEffect(() => {
   // fetch('http://localhost:8000/')
   // .then(json => result.json)
   // .catch(error => console.error(error))
   // }, [])
   

   return (
      <>
         <DecisionForm inputs={inputs} setInputs={setInputs} setResult={setResult} />

         <div className="hint">Enter both options — an AI will weigh in and decide</div>

         <Overlay inputs={inputs} result={result} setResult={setResult} />

      </>
   )
}

export default App
