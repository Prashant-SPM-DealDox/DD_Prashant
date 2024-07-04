import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../src/assets/css/login/Auth.css';
import { useAuthContext } from "../../src/hooks/useAuthContext";
import { baseUrl } from '../config';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPen, FaPlus, FaTable, FaTrash, FaUser } from "react-icons/fa";

function Auth() {

    const { user } = useAuthContext();
    const navigate = useNavigate();

    let userEmail
    let logedPerson;
    logedPerson = user?.userType || user?.people?.userType;
    let loginTime;

    if (logedPerson === "admin") {
        loginTime = user?.admin?.first_time_login === true;
        userEmail = user?.admin?.email;
    } else {
        loginTime = user?.people?.first_time_login === true;
        userEmail = user?.people?.email;
    }



    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const [secret, setSecret] = useState('');
    const [otp, setOtp] = useState('');
    const [qrCodeGenerated, setQrCodeGenerated] = useState(false);



    useEffect(() => {
        generateQRCode();
    }, [user]);

    //Function to Generate QR-Code
    const generateQRCode = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/auth/qrcode`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: `Bearer ${user.token}`,
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch QR code');
            }

            const responseData = await response.json(); // Extract JSON data from response

            setQrCodeUrl(responseData.data);
            setSecret(responseData.secret.base32); // Set the secret to base32 format
            setQrCodeGenerated(true); // Set the state to indicate QR code generation
        } catch (error) {
            // console.log('Error generating QR code:', error);
        }
    };


    //Function to validate OTP
    const validateOTP = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/auth/validate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    otp: otp,
                    secret: secret,
                }),
            });

            const responseData = await response.json();

            if (response.ok && responseData.success) {
                // localStorage.setItem("validated", true);
                navigate('/home');
            } else {
                toast.error("Invalid OTP", {
                    icon: (
                      <span style={{ color: "red" }}>
                        <FaTrash />
                      </span>
                    ),
                    className: "custom-toast_delete",
                  });
                navigate('/auth');
            }
        } catch (error) {
            console.error('Error validating OTP:', error); // Log the error
        }
    };

    const resetUserLoginStatus = async () =>{
        try{
            const response  = await fetch(`${baseUrl}/api/auth/updateStatus`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userEmail
                }),
            });
            const responsedata = await response.json();
            if(response.ok){
                alert(responsedata.message);
                // window.location.href = "/"
                handleCancelClick();
            }else{
                alert(responsedata.message)
                window.location.href = "/auth"
            }
        }catch(error){
            console.error('Error Updating Status:', error);
        }
    }

    const handleCancelClick = () => {
        // setInputValue("");
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    return (
        <div id="formtag">
            {qrCodeGenerated && user && (
                loginTime === false ? (
                    <div className="holePage">
                        <div className="qrauth">
                            <div className="twoFactor">
                                <label className='stepVerify'>Enable two-factor Authentication:</label>
                            </div>
                            <p className="content">
                                First, download a two-factor authentication app onto <br />
                                your phone or tablet, such as Authenticator.
                            </p>{" "}
                            <br />
                            <div className="step1">
                                <h4>Step1: Scan the Barcode</h4>
                            </div>
                            <div className='qrCodeUrl'>
                                <img id="img_code" src={qrCodeUrl} alt="QR Code" />
                            </div>
                            <p className="statement">
                                Scan the barcode with the app on your device.
                            </p>
                            <div className="step2">
                                <h4>Step2: Enter the 6-digit code from your app</h4>
                                <input
                                    id="qr_code"
                                    type="text"
                                    placeholder="Enter OTP from Google Authenticator"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <div className="btnFlex">
                                    <button className="cancelButton" onClick={handleCancelClick}>
                                        Cancel
                                    </button>
                                    <button className="valid_otp" onClick={validateOTP}>
                                        Validate OTP
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="entirePage">
                        <div className="Verification">
                            <div className="stepVerification">
                                <label className="stepVerify">2-Step Verification</label>
                                <h3>Authenticator App</h3>
                            </div>
                            <p className="text-content">
                                Enter the 6-digit code from your authenticator app.
                            </p>{" "}
                            <br />
                            <div className="inputDiv">
                                <label className="autheticatorcode">Authenticator Code</label>
                                <input
                                    id="qr_code"
                                    type="text"
                                    placeholder="Enter OTP from Google Authenticator"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </div>
                            <br />
                            <div className='subBtn'>
                                <button className="valid_otp_button" onClick={validateOTP}>
                                    Validate OTP
                                </button>
                            </div>
                            <div className="labels">
                                <h4 onClick={resetUserLoginStatus}>Regenerate QR code</h4>
                                <h4 onClick={handleCancelClick}>Log Out</h4>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default Auth;