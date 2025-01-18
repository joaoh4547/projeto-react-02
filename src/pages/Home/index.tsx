import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { useEffect, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";



interface Cycle{
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date
    interruptDate?: Date
    finishDate?: Date
}

export function Home(){
    
    const [cycles,setCycles] = useState<Cycle[]>([]);
    const [activeCycleId,setActiveCycleId] = useState<string | null>(null);
  
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);
   
    const task = watch("task");

    const isSubmitDisabled = !task;

    
    
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPass : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, "0");
    const seconds = String(secondsAmount).padStart(2, "0");

    useEffect(() =>{
        if(activeCycle){
            document.title =  `${minutes}:${seconds}`;
        }
    },[minutes,seconds,activeCycle]);

    function handleCreateCycle(data: NewCycleFormData){
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
        reset();
    }

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
            <form onSubmit={handleSubmit(handleCreateCycle)} action="">
                <NewCycleForm/>
                <CountDown 
                    activeCycle={activeCycle} 
                    setCycles={setCycles} 
                    activeCycleId={activeCycleId}
                />
                {
                    activeCycle ? (
                        <StopCountdownButton 
                            onClick={handleInterruptCycle} 
                            type="button"
                        >
                            <HandPalm size={24}/> Interromper
                        </StopCountdownButton>
                    ):(
                        <StartCountdownButton disabled={isSubmitDisabled}  type="submit">
                            <Play size={24}/> Começar
                        </StartCountdownButton>
                    )
                }
            </form>
        </HomeContainer>
    );
}