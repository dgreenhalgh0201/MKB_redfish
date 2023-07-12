import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [uefiBootMode, setUefiBootMode] = useState(false);
  const [dateTime, setDateTime] = useState(false);
  const [resetRom, setResetRom] = useState(false);
  const [machineIP, setMachineIP] = useState(false);
  const [machinePW, setMachinePW] = useState(false);
  const [generation, setGen] = useState(false);
  const [maker, setMake] = useState(false);



  const api = axios.create({
    baseURL: "http://localhost:9010"
  }
  )

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/set_bios_options', {
        uefi_boot_mode: uefiBootMode,
        date_time: dateTime,
        reset_rom: resetRom,
        username: machineIP,
        password: machinePW,
        gen: generation,
        make: maker
      });
      console.log(api.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          IP Address:
          <input type="text" onChange={setMachineIP}/>
        </label>  
        <label>
          <input type="text" onChange={setMachinePW} />
        </label>
        <label>
          Make:
          <input type="text" onChange={setMake}/>
        </label>
        <label>
        Gen:
          <input type="text" onChange={setGen}/>
        </label>
      </form>
      <h1>Set BIOS Options</h1>
      <form onSubmit={handleSubmit}>
        <label>
          UEFI Boot Mode:
          <input type="checkbox" checked={uefiBootMode} onChange={() => setUefiBootMode(!uefiBootMode)} />
        </label>
        <br />
        <label>
          Date and Time:
          <input type="checkbox" checked={dateTime} onChange={() => setDateTime(!dateTime)} />
        </label>
        <br />
        <label>
          Reset ROM:
          <input type="checkbox" checked={resetRom} onChange={() => setResetRom(!resetRom)} />
        </label>
        <br />
        <button type="submit">Set BIOS Options</button>
      </form>
    </div>
  );
}

export default App;