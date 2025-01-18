import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { createContext, useState } from "react";
import { CountDown } from "./components/CountDown";

interface Cycle{
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date
    interruptDate?: Date
    finishDate?: Date
}

interface CyclesContextData{
    activeCycle?: Cycle
    activeCycleId: string | null
    markCurrentCycleAsFinished: () => void
}


export const CyclesContext = createContext({} as CyclesContextData);

export function Home(){
    
    const [cycles,setCycles] = useState<Cycle[]>([]);
    const [activeCycleId,setActiveCycleId] = useState<string | null>(null);
  
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);
   
    // const task = watch("task");

    // const isSubmitDisabled = !task;

    
    
    function markCurrentCycleAsFinished(){
        setCycles(prevCycles => prevCycles.map(cycle => {
            if(cycle.id === activeCycleId){
                return {...cycle, finishDate: new Date()};
            }
            return cycle;
        }));
    }

    // function handleCreateCycle(data: NewCycleFormData){
    //     const id =  String(new Date().getTime());
    //     const newCycle : Cycle ={
    //         id,
    //         task: data.task,
    //         minutesAmount: data.minutesAmount,
    //         startDate: new Date(),
    //     };

    //     setCycles(prevCycles => [...prevCycles, newCycle]);
    //     setActiveCycleId(id);
    //     setAmountSecondsPass(0);
    //     reset();
    // }

    function handleInterruptCycle(){
        setCycles(prevCycles => prevCycles.map(cycle => {
            if(cycle.id === activeCycleId){
                return {...cycle, interruptDate: new Date()};
            }
            return cycle;
        }));

        setActiveCycleId(null);
    }
    return (
        <HomeContainer>
            <form /*onSubmit={handleSubmit(handleCreateCycle)}*/>
                <CyclesContext.Provider 
                    value={
                        {
                            activeCycle,
                            activeCycleId,
                            markCurrentCycleAsFinished
                        }
                    }
                >
                    {/* <NewCycleForm/> */}
                    <CountDown />
                </CyclesContext.Provider>
                {
                    activeCycle ? (
                        <StopCountdownButton 
                            onClick={handleInterruptCycle} 
                            type="button"
                        >
                            <HandPalm size={24}/> Interromper
                        </StopCountdownButton>
                    ):(
                        <StartCountdownButton /*disabled={isSubmitDisabled} */  type="submit">
                            <Play size={24}/> Começar
                        </StartCountdownButton>
                    )
                }
            </form>
        </HomeContainer>
    );
}