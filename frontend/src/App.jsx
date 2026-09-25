import { useState } from 'react'
import './App.css'


function decide(option1, option2, setResult) {
   fetch(`https://localhost:8000/ask?option1=${encodeURIComponent(option1)}&option2=${encodeURIComponent(option2)}`)
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

function DecideButton({option1, option2, setResult}) {
   return (
      <button className="decide-btn" onClick={() => {decide(option1, option2, setResult)}}>DECIDE!</button>
   )
}

function DecisionForm({inputs, setInputs, setResult}) {

   const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setInputs(prev => ({...prev, [name]: value}));
   }


   return (
      <>
         <Option name="option1" value={inputs.option1} onChange={handleChange}/>

         <div className="center-line"></div>

         <Option name="option2" value={inputs.option2} onChange={handleChange}/>

         <DecideButton option1={inputs.option1} option2={inputs.option2} setResult={setResult}/>
      </>
   )
}


function Overlay({inputs, result, setResult}) {
   return (
      <div className={result ? "overlay active" : "overlay"}>
         <div className="reveal-box">
            <div className="reveal-eyebrow">The decision is</div>
            <div className="reveal-winner">{result}</div>
            <div className="reveal-reasoning"></div>
            <div className="reveal-actions">
               <button className="reveal-btn primary" onClick={() => decide(inputs.option1, inputs.option2, setResult)}>Decide Again</button>
               <button className="reveal-btn secondary" onClick={() => setResult(null)}>Close</button>
            </div>
         </div>
      </div>
   )
}

function App() {
   const [result, setResult] = useState(null)
   const [inputs, setInputs] = useState({option1: '', option2: ''});

   return (
      <>
         <DecisionForm inputs={inputs} setInputs={setInputs} setResult={setResult} />

         <div className="hint">Enter both options — an AI will weigh in and decide</div>

         <Overlay inputs={inputs} result={result} setResult={setResult} />

      </>
   )
}

export default App
