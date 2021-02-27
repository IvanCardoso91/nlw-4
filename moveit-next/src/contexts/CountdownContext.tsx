import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from "./ChallengeContext";


let countdownTimeout: NodeJS.Timeout;

interface CountdownContextData {
    minutes: number,
    seconds: number,
    hasFinished: boolean,
    isActive: boolean,
    startCountdown:() => void,
    resetCountdown:() => void,

}

export const CountdownContext = createContext({} as CountdownContextData)

interface CountdownProviderProps {
    children: ReactNode;
}

export function CountdownProvider({ children }: CountdownProviderProps){

    const { startNewChallenge } = useContext(ChallengeContext)

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setisActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time/60);
    const seconds = time % 60



    function startCountdown(){
        setisActive(true)
    }

    function resetCountdown(){
        clearTimeout(countdownTimeout)
        setisActive(false)
        setTime(0.1 * 60)
        setHasFinished(false)
    }

    useEffect(() => {
        if(isActive && time > 0){
            countdownTimeout = setTimeout(() =>{
                setTime(time-1)
            }, 1000)
        } else if (isActive && time === 0){
            setHasFinished(true)
            setisActive(false)
            startNewChallenge();
        }
    }, [isActive, time])


    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown,
        }}>
            {children}
        </CountdownContext.Provider>
    )
}
