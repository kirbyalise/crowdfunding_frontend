import React, { useEffect } from 'react';

function AutoResizeTextArea({ value, onChange, ...props }) {
    const adjustHeight = (element) => {
        element.style.height = 'auto';
        element.style.height = element.scrollHeight + 'px';
    };

    useEffect(() => {
        const textarea = document.querySelector('textarea');
        if (textarea) {
            adjustHeight(textarea);
        }
    }, [value]);

    const handleChange = (e) => {
        adjustHeight(e.target);
        onChange(e);
    };

    return (
        <textarea
            value={value}
            onChange={handleChange}
            style={{ overflow: 'hidden' }}
            {...props}
        />
    );
}

export default AutoResizeTextArea; 