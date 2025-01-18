import { createContext, ReactNode, useReducer, useState } from "react";
import { ActionTypes, Cycle, cyclesReducer } from "../reducers/cycles";



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

    const [cyclesState, dispatch] = useReducer(cyclesReducer,{  cycles: [], activeCycleId: null} );

    const [amountSecondsPass, setAmountSecondsPass] = useState(0);
    console.log(cyclesState);
    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    function markCurrentCycleAsFinished(){
        dispatch({
            type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
            payload:{
                activeCycleId
            }
        });
        
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
        dispatch({
            type: ActionTypes.ADD_NEW_CYCLE,
            payload:{
                newCycle
            }
        });
        setAmountSecondsPass(0);
    }



    function interruptCurrentCycle(){
        dispatch({
            type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
            payload:{
                activeCycleId
            }
        });
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