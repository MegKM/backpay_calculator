import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const initialState = {
      rate: 0,
      MFOrdRate: 0,
      MFLNRate: 0,
      MFEMRate: 0,
      MFO1Rate: 0,
      MFO2Rate: 0,

      SaOrdRate: 0,
      SaO1Rate: 0,
      SaO2Rate: 0,

      SuOrdRate: 0,
      SuOTRate: 0,

      PHOrdRate: 0,
      PHOTRate: 0,
      
      MFOrdHours: 0,
      MFOrdMinutes: 0,
      MFLNHours: 0,
      MFLNMinutes: 0,
      MFEMHours: 0,
      MFEMMinutes: 0,
      MFO1Hours: 0,
      MFO1Minutes: 0,
      MFO2Hours: 0,
      MFO2Minutes: 0,

      SaOrdHours: 0,
      SaOrdMinutes: 0,
      SaO1Hours: 0,
      SaO1Minutes: 0,
      SaO2Hours: 0,
      SaO2Minutes: 0,

      SuOrdHours: 0,
      SuOrdMinutes: 0,
      SuOTHours: 0,
      SuOTMinutes: 0,

      PHOrdHours: 0,
      PHOrdMinutes: 0,
      PHOTHours: 0,
      PHOTMinutes: 0,
    };

    // Set initial states
    const [state, setState] = useState(initialState);

    // Set state for total dollar amounts
    const [ MFTotalDollar, setMFTotalDollar ] = useState(0);
    const [ SaTotalDollar, setSaTotalDollar ] = useState(0);
    const [ SuTotalDollar, setSuTotalDollar ] = useState(0);
    const [ PHTotalDollar, setPHTotalDollar ] = useState(0);
    const [ totalGrossPay, setTotalGrossPay ] = useState(0);
    const [ crewCoachAllowance, setCrewCoachAllowance ] = useState(0);
    const [ IFAAllowance, setIFAAllowance ] = useState(0);

    // Set state for job type and award
    const [ jobType, setJobType ] = useState("Full time");
    const [ awardType, setAwardType ] = useState("Level 1");

    // Handle hours and minutes being added
    function handleInputChange(event){
      const { name, value } = event.target;
      setState(prevState => ({
        ...prevState,
        [name]: parseFloat(value)}
      ));
    }

    // Handle base rate being added
    function handleRateChange(event){
        setState(prevState => ({
          ...prevState,
          rate: parseFloat(event.target.value)}))
    }

    function handleJobTypeSelection(event){
        setJobType(event.target.value)
    }

    function handleAwardTypeSelection(event){
        setAwardType(event.target.value)
    }

    // Calculate all pay rates based on base rate
    function updateOrdinaryRate(){
        const rate = parseFloat(state.rate);

        if((jobType === "Full time" || jobType === "Part time") && (awardType === "Level 1" || awardType === "Crew coach")){
            setState(prevState => ({
                ...prevState,
                rate: rate,
                MFOrdRate: rate,
                MFLNRate: Math.round(((rate * 1.1) + Number.EPSILON) * 100) / 100,
                MFEMRate: Math.round(((rate * 1.15) + Number.EPSILON) * 100) / 100,
                MFO1Rate: Math.round(((rate * 1.5) + Number.EPSILON) * 100) / 100,
                MFO2Rate: Math.round(((rate * 2) + Number.EPSILON) * 100) / 100,

                SaOrdRate: Math.round(((rate * 1.25) + Number.EPSILON) * 100) / 100,
                SaO1Rate: Math.round(((rate * 1.5) + Number.EPSILON) * 100) / 100,
                SaO2Rate: Math.round(((rate * 2) + Number.EPSILON) * 100) / 100,
          
                SuOrdRate: Math.round(((rate * 1.25) + Number.EPSILON) * 100) / 100,
                SuOTRate: Math.round(((rate * 2) + Number.EPSILON) * 100) / 100,
                
                PHOrdRate: Math.round(((rate * 2.25) + Number.EPSILON) * 100) / 100,
                PHOTRate: Math.round(((rate * 2.5) + Number.EPSILON) * 100) / 100,
            }))
        }
        else if(jobType === "Casual" && (awardType === "Level 1" || awardType === "Crew coach")){
            setState(prevState => ({
              ...prevState,
              rate: rate,
              MFOrdRate: rate * 1.25,
              MFLNRate: Math.round((((rate * 1.1) + (rate * 0.25)) + Number.EPSILON) * 100) / 100,
              MFEMRate: Math.round((((rate * 1.15) + (rate * 0.25)) + Number.EPSILON) * 100) / 100,
              MFO1Rate: Math.round((((rate * 1.5) + (rate * 0.25)) + Number.EPSILON) * 100) / 100,
              MFO2Rate: Math.round((((rate * 2) + (rate * 0.25)) + Number.EPSILON) * 100) / 100,

              SaOrdRate: Math.round((((rate * 1.25) + (rate * 0.25)) + Number.EPSILON) * 100) / 100,
              SaO1Rate: Math.round((((rate * 1.5) + (rate * 0.25)) + Number.EPSILON) * 100) / 100,
              SaO2Rate: Math.round((((rate * 2) + (rate * 0.25)) + Number.EPSILON) * 100) / 100,
        
              SuOrdRate: Math.round((((rate * 1.25) + (rate * 0.25)) + Number.EPSILON) * 100) / 100,
              SuOTRate: Math.round((((rate * 2) + (rate * 0.25)) + Number.EPSILON) * 100) / 100,
              
              PHOrdRate: Math.round((((rate * 2.25) + (rate * 0.25)) + Number.EPSILON) * 100) / 100,
              PHOTRate: Math.round((((rate * 2.5) + (rate * 0.25)) + Number.EPSILON) * 100) / 100,
          }))
        }
        else if((jobType === "Full time" || jobType === "Part time") && awardType === "Level 2"){
            setState(prevState => ({
              ...prevState,
              rate: rate,
              MFOrdRate: rate,
              MFLNRate: Math.round(((rate * 1.1) + Number.EPSILON) * 100) / 100,
              MFEMRate: Math.round(((rate * 1.15) + Number.EPSILON) * 100) / 100,
              MFO1Rate: Math.round(((rate * 1.5) + Number.EPSILON) * 100) / 100,
              MFO2Rate: Math.round(((rate * 2) + Number.EPSILON) * 100) / 100,

              SaOrdRate: Math.round(((rate * 1.25) + Number.EPSILON) * 100) / 100,
              SaO1Rate: Math.round(((rate * 1.5) + Number.EPSILON) * 100) / 100,
              SaO2Rate: Math.round(((rate * 2) + Number.EPSILON) * 100) / 100,
        
              SuOrdRate: Math.round(((rate * 1.5) + Number.EPSILON) * 100) / 100,
              SuOTRate: Math.round(((rate * 2) + Number.EPSILON) * 100) / 100,
              
              PHOrdRate: Math.round(((rate * 2.25) + Number.EPSILON) * 100) / 100,
              PHOTRate: Math.round(((rate * 2.5) + Number.EPSILON) * 100) / 100,
          }))
        }
        else {
            console.log("hit")
            setState(prevState => ({
              ...prevState,
              rate: rate,
              MFOrdRate: rate * 1.25,
              MFLNRate: Math.round((((rate * 1.1) + (rate * 0.25)) + Number.EPSILON) * 100) / 100,
              MFEMRate: Math.round((((rate * 1.15) + (rate * 0.25)) + Number.EPSILON) * 100) / 100,
              MFO1Rate: Math.round((((rate * 1.5) + (rate * 0.25)) + Number.EPSILON) * 100) / 100,
              MFO2Rate: Math.round((((rate * 2) + (rate * 0.25)) + Number.EPSILON) * 100) / 100,

              SaOrdRate: Math.round((((rate * 1.25) + (rate * 0.25)) + Number.EPSILON) * 100) / 100,
              SaO1Rate: Math.round((((rate * 1.5) + (rate * 0.25)) + Number.EPSILON) * 100) / 100,
              SaO2Rate: Math.round((((rate * 2) + (rate * 0.25)) + Number.EPSILON) * 100) / 100,
        
              SuOrdRate: Math.round((((rate * 1.5) + (rate * 0.25)) + Number.EPSILON) * 100) / 100,
              SuOTRate: Math.round((((rate * 2) + (rate * 0.25)) + Number.EPSILON) * 100) / 100,
              
              PHOrdRate: Math.round((((rate * 2.25) + (rate * 0.25)) + Number.EPSILON) * 100) / 100,
              PHOTRate: Math.round((((rate * 2.5) + (rate * 0.25)) + Number.EPSILON) * 100) / 100,
          }))
        }
    }

    // Update total for the week *after* the group totals have been calculated
    useEffect(() => {
        setTotalGrossPay(
          Math.round((MFTotalDollar + SaTotalDollar + SuTotalDollar + PHTotalDollar) * 100) / 100
        );
    }, [MFTotalDollar, SaTotalDollar, SuTotalDollar, PHTotalDollar]);
    
    // Mulitple inputted hours by applicable hourly rate
    function displayTotal(){
        const totalMFOrdDollars = state.MFOrdRate * minToDecimalCalc(state.MFOrdHours, state.MFOrdMinutes);
        const totalMFLNDollars = state.MFLNRate * minToDecimalCalc(state.MFLNHours, state.MFLNMinutes);
        const totalMFEMDollars = state.MFEMRate * minToDecimalCalc(state.MFEMHours, state.MFEMMinutes);
        const totalMFO1Dollars = state.MFO1Rate * minToDecimalCalc(state.MFO1Hours, state.MFO1Minutes);
        const totalMFO2Dollars = state.MFO2Rate * minToDecimalCalc(state.MFO2Hours, state.MFO2Minutes);

        const totalSaOrdDollars = state.SaOrdRate * minToDecimalCalc(state.SaOrdHours, state.SaOrdMinutes);
        const totalSaO1Dollars = state.SaO1Rate * minToDecimalCalc(state.SaO1Hours, state.SaO1Minutes);
        const totalSaO2Dollars = state.SaO2Rate * minToDecimalCalc(state.SaO2Hours, state.SaO2Minutes);

        const totalSuOrdDollars = state.SuOrdRate * minToDecimalCalc(state.SuOrdHours, state.SuOrdMinutes);
        const totalSuOTDollars = state.SuOTRate * minToDecimalCalc(state.SuOTHours, state.SuOTMinutes);

        const totalPHOrdDollars = state.PHOrdRate * minToDecimalCalc(state.PHOrdHours, state.PHOrdMinutes);
        const totalPHOTDollars = state.PHOTRate * minToDecimalCalc(state.PHOTHours, state.PHOTMinutes);

        setMFTotalDollar( Math.round((totalMFOrdDollars + totalMFLNDollars + totalMFEMDollars + totalMFO1Dollars + totalMFO2Dollars) * 10000) / 10000);
        setSaTotalDollar( Math.round((totalSaOrdDollars + totalSaO1Dollars + totalSaO2Dollars) * 10000) / 10000) ;
        setSuTotalDollar( Math.round((totalSuOrdDollars + totalSuOTDollars) * 10000) / 10000 );
        setPHTotalDollar( Math.round((totalPHOrdDollars + totalPHOTDollars) * 10000) / 10000 );

        if(awardType === "Crew Coach"){
            setCrewCoachAllowance(Math.round((calculateTotalHours() * 0.5) * 100) / 100);
        }

        if(awardType === "Level 2"){
            const totalHours = calculateTotlOrdinaryHours();
            if(totalHours > 38){
              setIFAAllowance(Math.round((38 * (state.rate * 0.1)) * 100) / 100);
            }
            else{
              setIFAAllowance(Math.round((totalHours * (state.rate * 0.1)) * 100) / 100);
            }
        }
    }

    function calculateTotalHours(){
        const totalHours = state.MFOrdHours + state.MFLNHours + state.MFEMHours + state.MFO1Hours + state.MFO2Hours + state.SaOrdHours + state.SaO1Hours + state.SaO2Hours + state.SuOrdHours + state.SuOTHours + state.PHOrdHours + state.PHOTHours;
        const totalMinutes = state.MFOrdMinutes + state.MFLNMinutes + state.MFEMMinutes + state.MFO1Minutes + state.MFO2Minutes + state.SaOrdMinutes + state.SaO1Minutes + state.SaO2Minutes + state.SuOrdMinutes + state.SuOTMinutes + state.PHOrdMinutes + state.PHOTMinutes;
        const totalHoursAndMinutes = minToDecimalCalc(totalHours, totalMinutes);
        
        return totalHoursAndMinutes
    }

    function calculateTotlOrdinaryHours(){
        const totalHours = state.MFOrdHours + state.MFLNHours + state.MFEMHours + state.SaOrdHours + state.SuOrdHours + state.PHOrdHours;
        const totalMinutes = state.MFOrdMinutes + state.MFLNMinutes + state.MFEMMinutes + state.SaOrdMinutes + state.SuOrdMinutes + state.PHOrdMinutes;
        const totalOrdinaryHoursAndMinutes = minToDecimalCalc(totalHours, totalMinutes)

        return totalOrdinaryHoursAndMinutes
        
    }

    // Convert minutes to decimals
    function minToDecimalCalc(hours, minutes){
        while(minutes > 60){
            minutes -= 60;
            hours += 1;
        }

        hours = hours + (minutes / 60);

        return hours;
    }

    return (
      <div className="app">
          <h1>Backpay Calculator</h1>
          <label>Base rate</label><input name="rate" id="rate" onChange={ handleRateChange }></input>
          <select onChange={ handleJobTypeSelection }>
            <option>Full time</option>
            <option>Part time</option>
            <option>Casual</option>
          </select>
          <select onChange={ handleAwardTypeSelection }>
            <option>Level 1</option>
            <option>Crew Coach</option>
            <option>Level 2</option>
          </select>
          <button onClick={ updateOrdinaryRate }>Submit</button>
          <div className="container">
            <div className="MF">
                <h2>Monday - Friday</h2>
                  <h4>Ordinary - ${ state.MFOrdRate }</h4>
                    <label>Hrs</label><input name="MFOrdHours" onChange={ handleInputChange }></input> 
                    <label>Min</label><input name="MFOrdMinutes" onChange={ handleInputChange }></input> 
                  <h4>Late Night - ${ state.MFLNRate }</h4>
                    <label>Hrs</label><input name="MFLNHours" onChange={ handleInputChange }></input> 
                    <label>Min</label><input name="MFLNMinutes" onChange={ handleInputChange}></input> 
                  <h4>Early Morning - ${ state.MFEMRate }</h4>
                    <label>Hrs</label><input name="MFEMHours" onChange={ handleInputChange }></input> 
                    <label>Min</label><input name="MFEMMinutes" onChange={ handleInputChange }></input>  
                  <h4>Overtime 1 - ${ state.MFO1Rate }</h4>
                    <label>Hrs</label><input name="MFO1Hours" onChange={ handleInputChange }></input> 
                    <label>Min</label><input name="MFO1Minutes" onChange={ handleInputChange }></input> 
                  <h4>Overtime 2 - $ { state.MFO2Rate }</h4>
                    <label>Hrs</label><input name="MFO2Hours" onChange={ handleInputChange }></input>
                    <label>Min</label><input name="MFO2Minutes" onChange={ handleInputChange }></input> 
                  <p>Total M-F: ${ MFTotalDollar }</p>
              </div>
            <div className="Sat">
                <h2>Saturday</h2>
                  <h4>Ordinary - ${ state.SaOrdRate }</h4>
                    <label>Hrs</label><input name="SaOrdHours" onChange={ handleInputChange }></input> 
                    <label>Min</label><input name="SaOrdMinutes" onChange={ handleInputChange }></input> 
                  <h4>Overtime 1 - ${ state.SaO1Rate }</h4>
                    <label>Hrs</label><input name="SaO1Hours" onChange={ handleInputChange }></input> 
                    <label>Min</label><input name="SaO1Minutes"></input> 
                  <h4>Overtime 2 - ${ state.SaO2Rate }</h4>
                    <label>Hrs</label><input name="SaO2Hours" onChange={ handleInputChange }></input>
                    <label>Min</label><input name="SaO2Minutes" onChange={ handleInputChange }></input> 
                    <p>Total Sat: ${ SaTotalDollar }</p>
            </div>
            <div className="Sun">
                <h2>Sunday</h2>
                  <h4>Ordinary - ${ state.SuOrdRate }</h4>
                    <label>Hrs</label><input name="SuOrdHours" onChange={ handleInputChange }></input> 
                    <label>Min</label><input name="SuOrdMinutes" onChange={ handleInputChange }></input> 
                  <h4>Overtime - ${ state.SuOTRate }</h4>
                    <label>Hrs</label><input name="SuOTHours" onChange={ handleInputChange }></input> 
                    <label>Min</label><input name="SuOTMinutes" onChange={ handleInputChange }></input> 
                    <p>Total Sun: ${ SuTotalDollar }</p>
            </div>
            <div className="PH">
                <h2>Public Holiday</h2>
                  <h4>Ordinary - ${ state.PHOrdRate }</h4>
                    <label>Hrs</label><input name="PHOrdHours" onChange={ handleInputChange }></input> 
                    <label>Min</label><input name="PHOrdMinutes" onChange={ handleInputChange }></input> 
                  <h4>Overtime - ${ state.PHOTRate }</h4>
                    <label>Hrs</label><input name="PHOTHours" onChange={ handleInputChange }></input>
                    <label>Min</label><input name="PHOTMinutes" onChange={ handleInputChange }></input> 
                    <p>Total PH: ${ PHTotalDollar }</p>
            </div>
          </div>
          <div className="totals">
          <button onClick={ displayTotal }>Calculate</button>
              <p>Total gross pay: ${ totalGrossPay }</p>
              <p>Crew coach allowance: ${ crewCoachAllowance }</p>
              <p>IFA allowance: ${ IFAAllowance }</p>
            </div>
      </div>
  );
}

export default App;
