import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import {baseUrl} from '../config'

export const useUserRegister = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (username, email, password) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    const response = await fetch(`${baseUrl}api/admin/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, email, password })
    })
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      setSuccess(true)
      if(json.error){
          setError(json.error)
      }
      // save the user to local storage
      // localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      // dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error, success }
}


export const useUserLogin = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${baseUrl}/api/admin/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      setSuccess(true);
      json.timestamp = new Date();
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { login, isLoading, error, success }
}

export const useUserLogout = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const logout = () => {
      // setError(null)

    
      // setSuccess(true)
      // save the user to local storage
      localStorage.setItem('user', "")

      // update the auth context
      // dispatch({type: 'LOGOUT', payload: ""})

      // update loading state
      setIsLoading(false)
    
  }

  return { logout, isLoading, error, success }
}