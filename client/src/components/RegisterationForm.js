// RegistrationForm.js
import React from 'react';
import InstrumentDropdown from './InstrumentDropdown';

const RegistrationForm = ({ username, setUsername, password, setPassword, instrument, setInstrument }) => (
  <form>
    <div className="form-group">
      <label>Username:</label>
      <input
        type="text"
        value={username}
        placeholder='Username'
        onChange={(e) => setUsername(e.target.value)}
        required
      />
    </div>
    <div className="form-group">
      <label>Password:</label>
      <input
        type="password"
        value={password}
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
    <div>
      <InstrumentDropdown instrument={instrument} setInstrument={setInstrument} />
    </div>
  </form>
);

export default RegistrationForm;
