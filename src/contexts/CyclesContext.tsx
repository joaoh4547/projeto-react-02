import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";



interface CreateCycleData{
    task: string,
    minutesAmount: number
}

interface CyclesContextData{
    cycles: Cycle[]
    activeCycle?: Cycle
    activeCycleId: string | null
    amountSecondsPass: number,
    setSecondsPassed: (seconds: number) => void
    markCurrentCycleAsFinished: () => void
    createCycle: (data: CreateCycleData) => void
    interruptCurrentCycle: () => void
}


export const CyclesContext = createContext({} as CyclesContextData);

interface CyclesContextProviderProps{
    children: ReactNode
}



export function CyclesContextProvider({children}: CyclesContextProviderProps){

    const [cyclesState, dispatch] = useReducer(cyclesReducer,{  cycles: [], activeCycleId: null} , (initialState) =>{
        const storageStateJson = localStorage.getItem("@timer:cycles-1.0.0");

        if(storageStateJson){
            return JSON.parse(storageStateJson);
        }

        return initialState;
    });
    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    const [amountSecondsPass, setAmountSecondsPass] = useState(() => {
        if(activeCycle){
            return  differenceInSeconds(new Date(), new Date(activeCycle.startDate));
        }
        return 0;
    });

    useEffect(() =>{
        const stateJson = JSON.stringify(cyclesState);
        localStorage.setItem("@timer:cycles-1.0.0", stateJson);
    },[cyclesState]);



 

    function markCurrentCycleAsFinished(){
        dispatch(markCurrentCycleAsFinishedAction());
        
    }

    function setSecondsPassed(seconds: number){
        setAmountSecondsPass(seconds);
    }

    function createCycle(data: CreateCycleData){
        const id =  String(new Date().getTime());
        const newCycle : Cycle ={
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        };
        dispatch(addNewCycleAction(newCycle));
        setAmountSecondsPass(0);
    }



    function interruptCurrentCycle(){
        dispatch(interruptCurrentCycleAction());
    }

    return (
        <CyclesContext.Provider
            value={
                {
                    activeCycle,
                    activeCycleId,
                    markCurrentCycleAsFinished,
                    amountSecondsPass,
                    setSecondsPassed,
                    createCycle,
                    interruptCurrentCycle,
                    cycles
                }
            }
        >
            {children}
        </CyclesContext.Provider>
    );
}