import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { API_URL } from "../App"
import { updateUser, useUser } from "../stores/userStore"
import { useNavigate } from "react-router"
import type { LoginDTO } from "../types/models"


const LoginFormComponent = () => {
    const [givenInput, changeGivenInput] = useState({ email: '', password: '' })
    const user = useUser();
    const navigate = useNavigate();

    const loginRequest = useMutation({
        mutationFn : async(loginData : LoginDTO) => {
            const response = await fetch(`${API_URL}/${user.id}/accounts/${loginData.email}/${loginData.password}`,
                { method : 'POST',
                  headers : { 'Content-Type' : 'application/json'}
                });
                if (!response) throw new Error("Failed to login.")
                    else console.log("Login request succesfully made.")
                return response.json();
        },
        onSuccess: (response) => {
            console.log("Name: ",response.name," ID: ",response.id);
            if(response.name!==null) {
            updateUser(response)
            navigate("/projectOverview")
            changeGivenInput({ email: '', password:'' })
            console.log("wat zit er in de store, id: " + user.id + ", name: " + user.name)
            console.log(response)
         } else console.log("empty data")
        },
        onError: () => {
            console.log("<generic failed login message>")
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