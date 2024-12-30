import React,{useState, useRef} from 'react';
import styled from 'styled-components';

const SignUpForm = () => {
  const firstName=useRef(null);
  const lastName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const [error, setError]=useState({
    "firstName":null,
    "lastName":null,
    "email":null,
    "password":null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(firstName.current.value.trim().length ==0){
      setError(prevError=>{
        return { ...prevError, ["firstName"]:"First name cannot be empty"}
      });
    } else{
      setError(prevError=>{
      return { ...prevError, ["firstName"]:null}
      });
    }

    if(lastName.current.value.trim().length == 0){
      setError(prevError=>{
        return { ...prevError, ["lastName"]:"Last name cannot be empty"}
      });
    } else{
      setError(prevError=>{
        return { ...prevError, ["lastName"]:null}
      });
    }

    if(email.current.value.trim().length ==0 || (/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/).test(email.current.value)){
      setError(prevError=>{
        return { ...prevError, ["email"]:"Invalid email address"}
      });
    } else{
      setError(prevError=>{
        return { ...prevError, ["email"]:null}
      });
    }

    if(password.current.value.trim().length <8){
      setError(prevError=>{
        return { ...prevError, ["password"]:"Password must be greater than 7 characters"}
      });
    } else{
      setError(prevError=>{
        return { ...prevError, ["password"]:null}
      });
    }

    if(error.firstName == null && error.lastName == null && error.email == null && error.password == null){
      console.log("Form submitted successfully");
    }    
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <input
          data-testid="first-name-id"
          type="text"
          name="firstName"
          placeholder="First Name"
          ref={firstName}
        />
        <p data-testid="first-name-error-id" className="error">{error.firstName}</p>
        <input
          data-testid="last-name-id"
          type="text"
          name="lastName"
          placeholder="Last Name"
          ref={lastName}
        />
        <p data-testid="last-name-error-id" className="error">{error.lastName}</p>
        <input
          data-testid="email-id"
          type="email"
          name="email"
          placeholder="Email Address"
          ref={email}
        />
        <p data-testid="email-error-id" className="error">{error.email}</p>
        <input
          data-testid="password-id"
          type="password"
          name="password"
          placeholder="Password"
          ref={password}
        />
        <p data-testid="password-error-id" className="error">{error.password}</p>
        <input
          data-testid="confirm-password-id"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
        />
        <p data-testid="confirm-password-error-id" className="error"></p>
        <button type="submit">Sign Up</button>
      </form>
    </Wrapper>
  );
};

export default SignUpForm;

const Wrapper = styled.div`
  margin-top: 24px;
  font-family: sans-serif;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  input {
    padding: 8px 12px;
    font-size: 18px;
    margin-bottom: 6px;
    width: clamp(200px, 40%, 400px)
  }

  button {
    padding: 10px 20px;
    font-size: 18px;
    border: none;
    border-radius: 4px;
    background-color: #333;
    color: #fff;
    cursor: pointer;
    margin-top: 24px;

    &:hover {
      opacity: 0.8;
    }
  }

  .error {
    margin: 0 0 24px 0;
    color: red;
  }
`;