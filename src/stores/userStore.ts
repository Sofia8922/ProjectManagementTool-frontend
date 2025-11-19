import { createStore } from "@odemian/react-store";
import type { AccountLoginReturnDTO } from "../types/Account";

// De momentele gebruiker, lekker hoog in App zodat ie overal berijkbaar is
export const [useUser, updateUser] = createStore<AccountLoginReturnDTO>({
    id: NaN,
    name: "",
})

export const logout = () => {
    location.replace("/")
    updateUser({id: NaN, name: ""})
}