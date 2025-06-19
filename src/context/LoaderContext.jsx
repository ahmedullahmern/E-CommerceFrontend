import { createContext, useState } from "react";


export const LoaderContext = createContext();

export default function LoaderContextProvider({ children }) {
    const [loader, setLoader] = useState(false)
    return (
        <LoaderContext.Provider value={{ loader, setLoader }}>
            {children}
        </LoaderContext.Provider>
    )
}



    // export const LoaderContext = createContext()

    // export function LoaderProvider({ children }) {
    //   const [loading, setLoading] = useState(false)
    //   return (
    //     <LoaderContext.Provider value={{ loading, setLoading }}>
    //       {children}
    //     </LoaderContext.Provider>
    //   )
    // }