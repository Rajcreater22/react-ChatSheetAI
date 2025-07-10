import React from 'react';

function Darkmod({ mode, toggleMode }) {

    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = '#042743';
        } else {
            setMode('light');
            document.body.style.backgroundColor = 'white';
        }
    }

    return (
        <div className={`form-check form-switch text-${mode === 'light' ? 'dark' : 'light'}`}>
            <input
                className="form-check-input"
                onClick={toggleMode}
                type="checkbox"
                id="flexSwitchCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                Enable Dark Mode
            </label>
        </div>
    );
}

export default Darkmod;
