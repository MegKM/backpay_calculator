import { useEffect, useState } from 'react';
import logo from './logo.svg';
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
    // Base rate
    const [state, setState] = useState(initialState);

    // // Weekday rates
    // const [ MFOrdRate, setMFOrdRate ] = useState(0);
    // const [ MFLNRate, setMFLNRate ] = useState(0);
    // const [ MFEMRate, setMFEMRate ] = useState(0);
    // const [ MFO1Rate, setMFO1Rate ] = useState(0);
    // const [ MFO2Rate, setMFO2Rate ] = useState(0);

    // //Saturday rates
    // const [ SaOrdRate, setSaOrdRate ] = useState(0);
    // const [ SaLNRate, setSaLNRate ] = useState(0);
    // const [ SaEMRate, setSaEMRate ] = useState(0);
    // const [ SaO1Rate, setSaO1Rate ] = useState(0);
    // const [ SaO2Rate, setSaO2Rate ] = useState(0);
  
    // //Sunday rates
    // const [ SuOrdRate, setSuOrdRate ] = useState(0);
    // const [ SuLNRate, setSuLNRate ] = useState(0);
    // const [ SuEMRate, setSuEMRate ] = useState(0);
    // const [ SuO1Rate, setSuO1Rate ] = useState(0);
    // const [ SuO2Rate, setSuO2Rate ] = useState(0);

    // //Public Holiday rates
    // const [ PHOrdRate, setPHOrdRate ] = useState(0);
    // const [ PHLNRate, setPHLNRate ] = useState(0);
    // const [ PHEMRate, setPHEMRate ] = useState(0);
    // const [ PHO1Rate, setPHO1Rate ] = useState(0);
    // const [ PHO2Rate, setPHO2Rate ] = useState(0);

    // // Weekday hours and minutes
    // const [ MFOrdHours, setMFOrdHours ] = useState(0);
    // const [ MFOrdMinutes, setMFOrdMinutes ] = useState(0);

    // const [ MFLNHours, setMFLNHours ] = useState(0);
    // const [ MFLNMinutes, setMFLNMinutes ] = useState(0);

    // const [ MFEMHours, setMFEMHours ] = useState(0);
    // const [ MFEMMinutes, setMFEMMinutes ] = useState(0);

    // const [ MFO1Hours, setMFO1Hours ] = useState(0);
    // const [ MFO1Minutes, setMFO1Minutes ] = useState(0);

    // const [ MFO2Hours, setMFO2Hours ] = useState(0);
    // const [ MFO2Minutes, setMFO2Minutes ] = useState(0);

    // Weekday total dollars
    const [ MFTotalDollar, setMFTotalDollar ] = useState(0);
    const [ SaTotalDollar, setSaTotalDollar ] = useState(0);
    const [ SuTotalDollar, setSuTotalDollar ] = useState(0);
    const [ PHTotalDollar, setPHTotalDollar ] = useState(0);
    const [ totalGrossPay, setTotalGrossPay ] = useState(0);

    function handleInputChange(event){
      const { name, value } = event.target;
      setState(prevState => ({
        ...prevState,
        [name]: parseFloat(value)}
      ));
    }

    function handleRateChange(event){
        setState(prevState => ({
          ...prevState,
          rate: parseFloat(event.target.value)}))
    }

    function updateOrdinaryRate(){
        const rate = parseFloat(state.rate);
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

    useEffect(() => {
        setTotalGrossPay(
          Math.round((MFTotalDollar + SaTotalDollar + SuTotalDollar + PHTotalDollar) * 100) / 100
        );
    }, [MFTotalDollar, SaTotalDollar, SuTotalDollar, PHTotalDollar]);
    
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
    }

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
          <label>Rate</label><input name="rate" id="rate" onChange={ handleRateChange }></input>
          <button onClick={ updateOrdinaryRate }>Submit</button>
          <div className="container">
            <div className="MF">
                <p>Monday - Friday</p>
                  <p>Ordinary - ${ state.MFOrdRate }</p>
                    <label>Hrs</label><input name="MFOrdHours" onChange={ handleInputChange }></input> 
                    <label>Min</label><input name="MFOrdMinutes" onChange={ handleInputChange }></input> 
                  <p>Late Night - ${ state.MFLNRate }</p>
                    <label>Hrs</label><input name="MFLNHours" onChange={ handleInputChange }></input> 
                    <label>Min</label><input name="MFLNMinutes" onChange={ handleInputChange}></input> 
                  <p>Early Morning - ${ state.MFEMRate }</p>
                    <label>Hrs</label><input name="MFEMHours" onChange={ handleInputChange }></input> 
                    <label>Min</label><input name="MFEMMinutes" onChange={ handleInputChange }></input>  
                  <p>Overtime 1 - ${ state.MFO1Rate }</p>
                    <label>Hrs</label><input name="MFO1Hours" onChange={ handleInputChange }></input> 
                    <label>Min</label><input name="MFO1Minutes" onChange={ handleInputChange }></input> 
                  <p>Overtime 2 - $ { state.MFO2Rate }</p>
                    <label>Hrs</label><input name="MFO2Hours" onChange={ handleInputChange }></input>
                    <label>Min</label><input name="MFO2Minutes" onChange={ handleInputChange }></input> 
                  <br></br><button onClick={ displayTotal }>Calculate</button>
                  <p>Total <span id="MF_total_hrs"></span>:<span id="MF_total_min"></span></p>
                  <p>${ MFTotalDollar }</p>
              </div>
            <div className="Sat">
                <p>Saturday</p>
                  <p>Ordinary - ${ state.SaOrdRate }</p>
                    <label>Hrs</label><input name="SaOrdHours" onChange={ handleInputChange }></input> 
                    <label>Min</label><input name="SaOrdMinutes" onChange={ handleInputChange }></input> 
                  <p>Overtime 1 - ${ state.SaO1Rate }</p>
                    <label>Hrs</label><input name="SaO1Hours" onChange={ handleInputChange }></input> 
                    <label>Min</label><input name="SaO1Minutes"></input> 
                  <p>Overtime 2 - ${ state.SaO2Rate }</p>
                    <label>Hrs</label><input name="SaO2Hours" onChange={ handleInputChange }></input>
                    <label>Min</label><input name="SaO2Minutes" onChange={ handleInputChange }></input> 
                    <br></br><button onClick={ displayTotal }>Calculate</button>
                    <p>Total <span id="Sa_total_hrs"></span>:<span id="Sa_total_min"></span></p>
                    <p>${ SaTotalDollar }</p>
            </div>
            <div className="Sun">
                <p>Sunday</p>
                  <p>Ordinary - ${ state.SuOrdRate }</p>
                    <label>Hrs</label><input name="SuOrdHours" onChange={ handleInputChange }></input> 
                    <label>Min</label><input name="SuOrdMinutes" onChange={ handleInputChange }></input> 
                  <p>Overtime - ${ state.SuOTRate }</p>
                    <label>Hrs</label><input name="SuOTHours" onChange={ handleInputChange }></input> 
                    <label>Min</label><input name="SuOTMinutes" onChange={ handleInputChange }></input> 
                    <br></br><button onClick={ displayTotal }>Calculate</button>
                    <p>Total <span id="Su_total_hrs"></span>:<span id="Su_total_min"></span></p>
                    <p>${ SuTotalDollar }</p>
            </div>
            <div className="PH">
                <p>Public Holiday</p>
                  <p>Ordinary - ${ state.PHOrdRate }</p>
                    <label>Hrs</label><input name="PHOrdHours" onChange={ handleInputChange }></input> 
                    <label>Min</label><input name="PHOrdMinutes" onChange={ handleInputChange }></input> 
                  <p>Overtime - ${ state.PHOTRate }</p>
                    <label>Hrs</label><input name="PHOTHours" onChange={ handleInputChange }></input>
                    <label>Min</label><input name="PHOTMinutes" onChange={ handleInputChange }></input> 
                    <br></br><button onClick={ displayTotal }>Calculate</button>
                    <p>Total <span id="PH_total_hrs"></span>:<span id="PH_total_min"></span></p>
                    <p>${ PHTotalDollar }</p>
            </div>
            <div>
              <p>Total gross pay: { totalGrossPay }</p>
            </div>
          </div>
      </div>
  );
}

export default App;
