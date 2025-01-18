import { createContext, ReactNode, useReducer, useState } from "react";

interface Cycle{
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date
    interruptDate?: Date
    finishDate?: Date
}

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

interface CyclesState{
    cycles: Cycle[],
    activeCycleId: string | null
}

export function CyclesContextProvider({children}: CyclesContextProviderProps){

    const [cyclesState, dispatch] = useReducer((state : CyclesState, action: any) => {
        if(action.type === "ADD_NEW_CYCLE"){
            return {
                ...state,
                cycles: [...state.cycles, action.payload.newCycle],
                activeCycleId: action.payload.newCycle.id
            };
        }

        if(action.type === "INTERRUPT_CURRENT_CYCLE"){
            return {
                ...state,
                cycles: [state.cycles.map(cycle => {
                    if(cycle.id === state.activeCycleId){
                        return {...cycle, interruptDate: new Date()};
                    }
                    return cycle;
                })],
                activeCycleId: null
            };
        }
        return state;
    },{  cycles: [], activeCycleId: null} );

    const [amountSecondsPass, setAmountSecondsPass] = useState(0);
    console.log(cyclesState);
    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    function markCurrentCycleAsFinished(){
        // setCycles(prevCycles => prevCycles.map(cycle => {
        //     if(cycle.id === activeCycleId){
        //         return {...cycle, finishDate: new Date()};
        //     }
        //     return cycle;
        // }));
        dispatch({
            type: "MARK_CURRENT_CYCLE_AS_FINISHED",
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
            type: "ADD_NEW_CYCLE",
            payload:{
                newCycle
            }
        });
        // setCycles(prevCycles => [...prevCycles, newCycle]);
        setAmountSecondsPass(0);
    }



    function interruptCurrentCycle(){
        dispatch({
            type: "INTERRUPT_CURRENT_CYCLE",
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