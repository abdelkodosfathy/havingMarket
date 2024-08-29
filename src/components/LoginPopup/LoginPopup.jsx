import React from 'react';
import { FunctionsContext } from '../Context';
import { useContext } from 'react';
import styles from "../Login/Styles.module.scss";

const LoginPopup = ({onLogin, children, stage, }) => {

    const tokenChanger = useContext(FunctionsContext).changeToken;
    const addPhone = useContext(FunctionsContext).addPhone;
    const popupIconStyle = {
        border: "1px solid #ddd",
        borderRadius: "50%",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 5px",
        boxShadow:"none",
        padding:"0",
        height: "40px",
        width: "40px",
        color: "black",
        // background:"var(--green)"
        background:"white",
        

      };
    const openLoginPopup = (e) => {
    //  console.log("LoginPopup event : ", e);
        e.preventDefault();
        const popup = window.open(
            `https://app.having.market/auth/${stage}/redirect`,
            'authPopup',
            'width=600,height=400'
        );

        window.addEventListener('message', function(event) {
            console.log("window's event: ", event);
            console.log("window's origin: ", origin);
            
            console.log(event.origin);
            if (event.origin !== 'https://app.having.market') {
                
                return;
            }

            if (event.data.tokenSender) {
                // Store the token (e.g., in localStorage)
                localStorage.setItem('PopupAuthToken', event.data.tokenSender);
                localStorage.setItem('PopupPhone', event.data.phoneSender);
                tokenChanger(event.data.tokenSender, true);
                if(event.data.phoneSender){
                    addPhone(event.data.phoneSender,event.data.tokenSender,true);
                }
                onLogin();
                // Optionally, you can trigger some re-authentication logic in your app
                // console.log('Authentication successful:', event.data.tokenSender);
            }
        });
    };

    return (
        // <button onClick={openLoginPopup}>Login with Goole</button>
        <button onClick={openLoginPopup} style={popupIconStyle}>{children}</button>
    );
};

export default LoginPopup;
