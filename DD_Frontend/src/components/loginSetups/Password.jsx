import React, { useState, useEffect,useRef} from 'react';
import '../../assets/css/login/Password.css';
import { FaEye, FaEyeSlash,FaInfo } from 'react-icons/fa'; // Import eye icons
import { MdCheck } from 'react-icons/md'; // for MdCheck
import { GoDotFill } from "react-icons/go";// for GoDotFill
import { RxCross2 } from "react-icons/rx";

const Password = ({ onChange, onValidityChange,custuminput,custuminputone,onFocus,onBlur,  }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [PasswordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setconfirmPasswordFocused] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
    // Validate Fields:
    const [numberValidate,setnumberValidate] = useState(true);
    const [UpperCaseValidate,setUpperCaseValidate] = useState(true);
    const [LowerCaseValidate,setLowerCaseValidate] = useState(true);
    const [splCharacterValidate,setsplCharacterValidate] = useState(true);
    const [lengthValidate,setLengthValidate] = useState(true);
    const [openValidateFields,setOpenValidateFields] = useState(false);
    const [defaultDots,setdefaultDots] = useState(false);

  useEffect(() => {
    validatePasswords();
  }, [password, confirmPassword]);

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword((prevState) => !prevState);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword((prevState) => !prevState);
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
    onChange(newPassword);
    setPasswordError('')
    setdefaultDots(true)
    let  numberValidates = new RegExp("(?=.*[0-9])");
    let  UpperCaseValidates = new RegExp("(?=.*[A-Z])");
    let LowerCaseValidates = new RegExp("(?=.*[a-z])");
    let splCharacterValidates = new RegExp("(?=.*[@/$/%/&!/*])")
    let lengthValidates = new RegExp("(?=.{8,100})")
  
  
    setnumberValidate(numberValidates.test(newPassword));
    setLowerCaseValidate(LowerCaseValidates.test(newPassword));
    setUpperCaseValidate(UpperCaseValidates.test(newPassword));
    setsplCharacterValidate(splCharacterValidates.test(newPassword));
    setLengthValidate(lengthValidates.test(newPassword));
    
    if(numberValidate && UpperCaseValidate && LowerCaseValidate && splCharacterValidate && lengthValidate){
      setOpenValidateFields(false)
    }else{
      setOpenValidateFields(true);
    }
  };
  const handlepasswordlBlur = (e) => {
    // Add your validation logic here
    if (password.trim() === '') {
      setPasswordError('Password is required');
    }else {
      setPasswordError('');
    }
  };
  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    validatePasswords();
    setConfirmPasswordError('');
  };
  const handleconfirmpasswordlBlur = (e) => {
    if (confirmPassword.trim() === '') {
      setConfirmPasswordError('Confirm Password is required');
    } else {
      setConfirmPasswordError('');
    }
  };
  const validatePasswords = () => {
    const isValid =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/.test(password) &&
      password === confirmPassword;
    setPasswordsMatch(isValid);
    onValidityChange(isValid);
  };
const passminput="trial"
  const validatePassword = (newPassword) => {
    const isPatternValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/.test(newPassword);
    // setIsPasswordValid(isPatternValid);
    const passwordError = isPatternValid
      ? ''
      : (
        
        <b id="notMatch" className={passminput}>
         
          {openValidateFields}
        </b>
      );
    onValidityChange(isPatternValid);
    setPasswordError(passwordError);
  };
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const handlePasswordLabelClick = () => {
    setPasswordFocused(true);
    passwordRef.current.focus();
  };
  const handleConfirmPasswordLabelClick = () => {
    setconfirmPasswordFocused(true);
    confirmPasswordRef.current.focus();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (passwordRef.current && !passwordRef.current.contains(event.target)) {
            setOpenValidateFields(false);
        }
     
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, []);


  return (
    <div id="complexPassword">
        <div id="mainpasswordDiv" className={PasswordFocused || password ? 'focused' : ''}>
        <label htmlFor="registerPassword" id="mainpasswordlabel"onClick={handlePasswordLabelClick}>
          Password
        </label>
        <br />
        <div className='pass-container'>
        <input
        ref={passwordRef}
          type={showPassword ? 'text' : 'password'}
          id="password"
          className={`registerPassword ${custuminput}`}
          required
          placeholder={PasswordFocused ? 'Enter your password' : 'Password'}
          value={password}
          onChange={handlePasswordChange}
          onPaste={handlePaste}
          onFocus={() => setPasswordFocused(true)}
          onBlur={handlepasswordlBlur}
          onClick={()=>setOpenValidateFields(true)}
          autoComplete="new-password"
          style={{
            outlineColor: passwordError  ? "#c23934" : "#715CF3",
            border: passwordError ? "1.5px solid #c23934" : "",
            background: passwordError  ? "#f6e2e1" : "",
          }}
        />
        <span onClick={() => togglePasswordVisibility('password')} className="eye-icon_password">
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
        </div>
  
        {
          openValidateFields && 
          <div className='validateField'>
         <ul className='passwordError'>
         <li className={lengthValidate ? "validatelistcontent" : "notValidateListcontent"}>  {defaultDots ? (
    lengthValidate ? (
        <MdCheck style={{ color: "rgb(74, 146, 59) " }} size={16} />
    ) : (
      <RxCross2 style={{ color:"#c23934" }} size={16} />
    )
) : (
    <GoDotFill size={13} />
)}At least 8 characters long.</li>
          <li className={UpperCaseValidate ? "validatelistcontent" : "notValidateListcontent"}>  {defaultDots ? (
    UpperCaseValidate ? (
        <MdCheck style={{ color: "rgb(74, 146, 59) " }} size={16} />
    ) : (
      <RxCross2 style={{ color:"#c23934" }} size={16} />
    )
) : (
    <GoDotFill size={13} />
)}Contains uppercase letters.</li>
          <li className={LowerCaseValidate ? "validatelistcontent" : "notValidateListcontent"}>  {defaultDots ? (
    LowerCaseValidate ? (
        <MdCheck style={{ color: "rgb(74, 146, 59) " }} size={16} />
    ) : (
      <RxCross2 style={{ color:"#c23934" }} size={16} />
    )
) : (
    <GoDotFill size={13} />
)}Contains lowercase letters.</li>
          <li className={ numberValidate ? "validatelistcontent" : "notValidateListcontent"}>    {defaultDots ? (
    numberValidate ? (
        <MdCheck style={{ color: "rgb(74, 146, 59) " }} size={16} />
    ) : (
        <RxCross2 style={{ color:"#c23934" }} size={16} />
    )
) : (
    <GoDotFill size={13} />
)} Contains numbers.</li>
          <li className={splCharacterValidate ? "validatelistcontent" : "notValidateListcontent"}>  {defaultDots ? (
    splCharacterValidate ? (
        <MdCheck style={{ color: "rgb(74, 146, 59) " }} size={16} />
    ) : (
      <RxCross2 style={{ color:"#c23934" }} size={16} />
    )
) : (
    <GoDotFill size={13} />
)}Contains special character.</li>
         </ul>
            </div>
        } 
        
        {passwordError &&   <b id="notMatch"className={passminput} >{passminput &&<FaInfo id="sampleone" />}{passwordError}</b>}
      </div>
      <br />
      <div id="confirmPassworddiv" className={confirmPasswordFocused || confirmPassword ? 'focused' : ''}>
        <label htmlFor="cpassReg" id="confirmPasswordLabel"onClick={handleConfirmPasswordLabelClick}>Confirm Password</label> <br />
        <div className='pass-container'>
        <input
        ref={confirmPasswordRef}
          type={showConfirmPassword ? 'text' : 'password'}
          className={`cpassReg ${custuminputone} confirmpassword`}
          required
          placeholder={confirmPasswordFocused ? 'Enter Your Confirm Password' : 'Confirm Password'}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          onPaste={handlePaste}
          onFocus={() => setconfirmPasswordFocused(true)}
          onBlur={handleconfirmpasswordlBlur}
          autoComplete="new-password"
        
          id={confirmPasswordError ? 'error-input' : ''} 
          style={{
            outlineColor: !passwordsMatch && confirmPassword ||confirmPasswordError ? "#c23934" : "#715CF3",
            border: !passwordsMatch && confirmPassword ||confirmPasswordError ? "1.5px solid #c23934" : "",
            background: !passwordsMatch && confirmPassword || confirmPasswordError ? "#f6e2e1" : "",
          }}
        />
        <span onClick={() => togglePasswordVisibility('confirmPassword')} className="eye-icon_password">
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
        </div>
   
        {confirmPasswordError && (
          <p style={{ color: '#c23934', fontSize: '12px', padding: '3px' }}>
            <FaInfo id="sample" /> {confirmPasswordError}
          </p>
        )}
        {!passwordsMatch && confirmPassword &&  (
  <b id="notMatch">
    <FaInfo id="sampleone" /> Password does not match
  </b>
)}
      </div>
    </div>
  );
};

export default Password;
