import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

// If we use useAuthContext context inside a component, as long as we are in the scope of that contact
// inside the authContextProvider, we are going to get that context returned to us as an object
// that will contain the properties in the state and the dispatch function.
const useAuthContext = () => {
    const context = useContext(AuthContext)

    // would be a real problem if the context wrapped just a sub tree of components and not the entire app
    if (!context) {
        throw Error('useAuthContext must be inside an AuthContextProvider')
    }

    // if we use the useAuthContext hook in another component we'll get the context
    return context
}

export default useAuthContext;