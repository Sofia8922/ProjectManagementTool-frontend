import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { API_URL, updateUser } from "../App"
import type { LoginDTO } from "../models"

const LoginFormComponent = () => {
    const [givenInput, changeGivenInput] = useState({ email: '', password: '' })

    const loginRequest = useMutation({
        mutationFn : async(loginData : LoginDTO) => {
            const response = await fetch(`${API_URL}/${loginData.email}/${loginData.password}`,
                { method : 'POST',
                  headers : { 'Content-Type' : 'application/json'},
                  body : JSON.stringify('')
                });
                if (!response) throw new Error("Failed to login.")
                    else console.log("User succesfully logged in!")
                return response.json();
        },
        onSuccess: (data) => {
            updateUser(data)
            changeGivenInput({ email: '', password:'' })
        }
    })

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        loginRequest.mutate(givenInput);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        changeGivenInput({ ...givenInput, [name]: value });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h5>LOGIN</h5>
            <div>
                <label htmlFor="username"> Enter Email Address:</label>
                <input type="text" id="email" name="email" value={givenInput.email} onChange={handleChange} />
            </div>
            <div>
                                <label htmlFor="password"> Password:</label>
                <input type="text" id="username" name="password" value={givenInput.password} onChange={handleChange} />
            </div>
            <button
                type="submit">
                Log in!
            </button>
        </form>
    )
}

export default LoginFormComponent