import React from "react";
import "../App.css";

interface AlertProps {
    message: string;
    type: "success" | "error" | "warning" | "info";
    isVisible: boolean;
    onClose?: () => void;
};

const Alert = (props:AlertProps) => {
    const { message, type } = props;
    const [visible, setVisible] = React.useState(props.isVisible);

    const getAlertType = () => {
        switch (type) {
            case 'success':
            return 'alert-success'; // Clase de DaisyUI para éxito
            case 'error':
            return 'alert-error';   // Clase de DaisyUI para error
            case 'warning':
            return 'alert-warning'; // Clase de DaisyUI para advertencia
            case 'info':
            return 'alert-info';     // Clase de DaisyUI para información
            default:
            return 'alert-info';
        }
    };
    
    const typeClass = getAlertType();

    React.useEffect(() => {
        setVisible(props.isVisible);
    }, [props.isVisible]);

    return (
        <div className={`alert `+typeClass} role="alert" style={{ display: visible ? 'flex' : 'none', minWidth: '250px', maxWidth: '400px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <span>{message}</span>
            {props.onClose && (
                <button onClick={props.onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    &times;
                </button>
            )}
        </div>
    );
};

export default Alert;