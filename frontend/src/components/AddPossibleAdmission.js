import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AddPossibleAdmission = () => {
    const [status, setStatus] = useState(''); // State for status
    const [source, setSource] = useState('');  // State for the source dropdown
    const [sourceOther, setSourceOther] = useState('');  // State for the custom source input
    const [name, setName] = useState('');
    const [age, setAge] = useState(''); // State for age
    const [sex, setSex] = useState(''); // State for the sex dropdown
    const [plan, setPlan] = useState('');  // State for the plan dropdown
    const [planOther, setPlanOther] = useState('');  // State for custom plan input when 'Other' is selected
    const [dx, setDx] = useState('');  // State for the DX field
    const [presented, setPresented] = useState('');  // State for the Presented field
    const [notes, setNotes] = useState('');  // State for the Notes field
    const navigate = useNavigate(); // Initialize navigate
    const [mso, setMso] = useState('');  // State for the MSO dropdown
    const [sixtyPercentRule, setSixtyPercentRule] = useState('');  // State for the 60% Rule dropdown

    const handleSave = () => {
        const payload = {
            status,
            source: source === 'Other' ? sourceOther : source,
            name,
            age,
            sex,
            plan: plan === 'Other' ? planOther : plan,
            dx,
            presented,
            notes,
            mso,
            sixtyPercentRule
        };
        axios.post('http://localhost:8080/api/patients', payload)
            .then(() => {
                navigate('/pre-admissions');
            })
            .catch(error => {
                console.error('Error saving patient:', error);
                alert('Failed to save patient!');
            });
    };

    return (
        <div className="page-container">
            <div className="form-container">
                <h1>Add Patient to Possible Admissions</h1>
                <form onSubmit={e => e.preventDefault()}>
                    <label>
                        Status:
                        <select value={status} onChange={e => setStatus(e.target.value)}>
                            <option value="" disabled>Select Option</option>
                            <option value="Ready">Ready</option>
                            <option value="Not Ready">Not Ready</option>
                            <option value="Discharge Home">Discharge Home</option>
                        </select>
                    </label>
                   <label>
                         Source:
                         <select value={source} onChange={e => setSource(e.target.value)}>
                             <option value="">Select Option</option>
                             <option value="HIMA Caguas (HC)">HIMA Caguas (HC)</option>
                             <option value="Hogar">Hogar</option>
                             <option value="San Lucas (SL)">San Lucas (SL)</option>
                             <option value="Aguadilla (Ag)">Aguadilla (Ag)</option>
                             <option value="HDLC">HDLC</option>
                             <option value="ASEM/UDH/Ped (UDH)">ASEM/UDH/Ped (UDH)</option>
                             <option value="Pila">Pila</option>
                             <option value="San Carlos (SCar)">San Carlos (SCar)</option>
                             <option value="Menonita Cay (MenCay)">Menonita Cay (MenCay)</option>
                             <option value="Perea">Perea</option>
                             <option value="BellaV (BV)">BellaV (BV)</option>
                             <option value="San Crist (SCris)">San Crist (SCris)</option>
                             <option value="Damas">Damas</option>
                             <option value="Yauco">Yauco</option>
                             <option value="Menonita Cag (MenCag)">Menonita Cag (MenCag)</option>
                             <option value="DCSJ">DCSJ</option>
                             <option value="MetroSG (MSG)">MetroSG (MSG)</option>
                             <option value="Other">Other</option>
                         </select>
                     </label>
                     {/* Conditional rendering for custom source */}
                     {source === 'Other' && (
                         <label>
                             Source-Other:
                             <input
                                 type="text"
                                 value={sourceOther}
                                 onChange={e => setSourceOther(e.target.value)}
                             />
                         </label>
                     )}
                    <label>
                        Name:
                        <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    </label>
                    <label>
                        Age:
                        <input type="number" value={age} onChange={e => setAge(e.target.value)} />
                    </label>
                    <label>
                        Sex:
                        <select value={sex} onChange={e => setSex(e.target.value)}>
                            <option value="" disabled>Select Option</option>
                            <option value="F">F</option>
                            <option value="M">M</option>
                        </select>
                    </label>
                    <label>
                        Plan:
                        <select value={plan} onChange={e => setPlan(e.target.value)}>
                            <option value="" disabled>Select Option</option>
                            <option value="SSSA">SSSA</option>
                            <option value="SSSP">SSSP</option>
                            <option value="MMMA">MMMA</option>
                            <option value="PMCA">PMCA</option>
                            <option value="FMP">FMP</option>
                            <option value="FMA">FMA</option>
                            <option value="MCSP">MCSP</option>
                            <option value="MAF">MAF</option>
                            <option value="MEDPR">MEDPR</option>
                            <option value="PRM">PRM</option>
                            <option value="FMV">FMV</option>
                            <option value="SSSV">SSSV</option>
                            <option value="HUMA">HUMA</option>
                            <option value="HUMP">HUMP</option>
                            <option value="PSMP">PSMP</option>
                            <option value="PSMV">PSMV</option>
                            <option value="MMMV">MMMV</option>
                            <option value="TRI">TRI</option>
                            {/* Add other plan options similarly */}
                            <option value="Other">Other</option>
                        </select>
                    </label>
                    {plan === 'Other' && (
                         <label>
                            Plan-Other:
                            <input
                                type="text"
                                value={planOther}
                                onChange={e => setPlanOther(e.target.value)}
                            />
                         </label>
                    )}
                    <label>
                            DX:
                            <input type="text" value={dx} onChange={e => setDx(e.target.value)} />
                        </label>
                        <label>
                            Presented:
                            <input type="text" value={presented} onChange={e => setPresented(e.target.value)} />
                        </label>
                        <label>
                            Notes:
                            <textarea value={notes} onChange={e => setNotes(e.target.value)} />
                    </label>
                    <label>
                        MSO:
                        <select value={mso} onChange={e => setMso(e.target.value)}>
                            <option value="" disabled>Select Option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </label>
                    <label>
                        60% Rule:
                        <select value={sixtyPercentRule} onChange={e => setSixtyPercentRule(e.target.value)}>
                            <option value="" disabled>Select Option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </label>
                    <button type="button" onClick={handleSave}>Save & Submit</button>
                    <button type="button" onClick={() => navigate('/pre-admissions')}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default AddPossibleAdmission;
