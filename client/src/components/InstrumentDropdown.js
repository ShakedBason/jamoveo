// InstrumentDropdown component, inplemented seperatley for reusability and maintance
import React from 'react';
import '../Style/AppStyle.css';

const InstrumentDropdown = ({ instrument, setInstrument }) => {
  return (
    <div className="form-group">
      <label htmlFor="instrument">Instrument:</label>
      <select 
        id="instrument" 
        value={instrument} 
        onChange={(e) => setInstrument(e.target.value)} 
        required
      >
        <option value="">Select an instrument</option>
        <option value="drums">Drums</option>
        <option value="guitar">Guitar</option>
        <option value="bass">Bass</option>
        <option value="saxophone">Saxophone</option>
        <option value="keyboards">Keyboards</option>
        <option value="vocals">Vocals</option>
      </select>
    </div>
  );
};

export default InstrumentDropdown;
