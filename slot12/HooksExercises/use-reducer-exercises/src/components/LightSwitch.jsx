//LightSwitch component using useReducer to toggle light on and off
import React, { useReducer } from 'react';
import Button from 'react-bootstrap/Button';

// Reducer đơn giản xử lý action 'TOGGLE'
function reducer(state, action) {
    switch (action.type) {
        case 'TOGGLE':
            return { isLightOn: !state.isLightOn };
        default:
            return state;
    }
}

function LightSwitch() {
    // Khởi tạo useReducer thay cho useState
    const [state, dispatch] = useReducer(reducer, { isLightOn: false });

    // Hàm toggle giờ dispatch action
    const toggleLight = () => dispatch({ type: 'TOGGLE' });

    // Style chung cho các button
    const buttonStyle = {  
        margin: '5px',
        padding: '10px 20px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px'
    };
    return (
        <div style={{margin: '10px auto', padding: '20px', border: '1px solid #ccc', width: '300px', background: state.isLightOn ? 'red' : 'green'}}>     
            <h2>Công Tắc Đèn</h2>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                Đèn hiện đang: {state.isLightOn ? 'Bật' : 'Tắt'}  
            </p>
            <Button
                onClick={toggleLight}   
                style={{ 
                    ...buttonStyle,
                    border: '2px solid white',
                    background: state.isLightOn ? 'red' : 'green',
                    color: 'white'
                }}  
            >
                {state.isLightOn ? 'Tắt Đèn' : 'Bật Đèn'}  
            </Button>   
        </div>
    );
}
export default LightSwitch;
