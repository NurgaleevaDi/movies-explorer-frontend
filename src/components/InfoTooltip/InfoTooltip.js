import React from "react";

function InfoTooltip(props) {
    return (
        <div className={`popup ${props.openPopup ? "popup_opened" : ""}`}>
            <div className="popup__overlay">
                <div className="popup__content">
                    <button 
                        className="popup__close-btn button" 
                        type="button"
                        onClick={props.onClose}>
                    </button>
                    <p className="popup__message">{props.message}</p>
                </div>
            </div>
        </div>
    )
}

export default InfoTooltip;