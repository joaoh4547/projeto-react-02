import { createContext, ReactNode, useState } from "react";

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

export function CyclesContextProvider({children}: CyclesContextProviderProps){

    const [cycles,setCycles] = useState<Cycle[]>([]);
    const [activeCycleId,setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPass, setAmountSecondsPass] = useState(0);



    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    function markCurrentCycleAsFinished(){
        setCycles(prevCycles => prevCycles.map(cycle => {
            if(cycle.id === activeCycleId){
                return {...cycle, finishDate: new Date()};
            }
            return cycle;
        }));
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

        setCycles(prevCycles => [...prevCycles, newCycle]);
        setActiveCycleId(id);
        setAmountSecondsPass(0);
    }



    function interruptCurrentCycle(){
        setCycles(prevCycles => prevCycles.map(cycle => {
            if(cycle.id === activeCycleId){
                return {...cycle, interruptDate: new Date()};
            }
            return cycle;
        }));

        setActiveCycleId(null);
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