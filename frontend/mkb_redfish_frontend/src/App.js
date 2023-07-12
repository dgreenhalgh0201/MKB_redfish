import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [uefiBootMode, setUefiBootMode] = useState(false);
  const [dateTime, setDateTime] = useState(false);
  const [resetRom, setResetRom] = useState(false);


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
        reset_rom: resetRom
      });
      console.log(api.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
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