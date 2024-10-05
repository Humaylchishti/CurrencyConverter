import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import currencyapi from '@everapi/currencyapi-js'

function App() {
  const [convertedValue, setConvertedValue] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');



  const handleClick = () => {
    if (amount) {
      convert()
    }
  }


  const handleChange = (e) => {
    setAmount(e.target.value)
  }

  const handleCurrencyChance = (e) => {
    setSelectedCurrency(e.target.value)
  }


  const convert = async (exchange) => {

    try {
      const client = new currencyapi(`${import.meta.env.VITE_APP_ID}`)
      const response = await client.latest({
        base_currency: 'USD',
        currencies: selectedCurrency,
      })
      console.log(response);
      const exchangeRate = response.data[selectedCurrency].value;
      const converted = (amount * exchangeRate).toFixed(2);
      setConvertedValue(converted);


    } catch (error) {
      console.log('There was an error:', error)
    }
  }


  return (
    <>
      <h1> Currency Converter</h1>
      <hr></hr>
      <label htmlFor='selection'> Select a currency to covert to: </label>
      <select value={selectedCurrency} name='selection' id='selection' onChange={handleCurrencyChance}>
        <option> USD </option>
        <option> EUR </option>
        <option> GBP </option>
        <option> JPY </option>
      </select>
      <hr></hr>
      <input value={amount} placeholder='Enter amount in USD' onChange={handleChange} type='number'></input>
      <button onClick={handleClick}> Convert </button>
      <p> Converted Amount: {convertedValue} {selectedCurrency} </p>


    </>
  )
}


export default App