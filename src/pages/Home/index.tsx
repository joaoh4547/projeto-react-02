import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";

const newCycleSchema = z.object({
    task: z.string().min(1, "Informe a Tarefa").max(50),
    minutesAmount: z.number().int()
        .min(1,"O ciclo deve ser de no mínimo 1 minuto. ")
        .max(60, "O ciclo deve ser de no máximo 60 minutos. "),
});

type NewCycleFormData = z.infer<typeof newCycleSchema> 

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
    const [amountSecondsPass, setAmountSecondsPass] = useState(0);
    
    
    const {register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0,
        }
        
    });
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
    
    useEffect(() =>{
        let interval : number;
        if(activeCycle){
            interval = setInterval(() => {
                const secondsDifference =  differenceInSeconds(new Date(), activeCycle.startDate);
                if(secondsDifference >= totalSeconds){
                    setCycles(prevCycles => prevCycles.map(cycle => {
                        if(cycle.id === activeCycleId){
                            return {...cycle, finishDate: new Date()};
                        }
                        return cycle;
                    }));
                    setAmountSecondsPass(totalSeconds);
                    clearInterval(interval);
                }
                else{
                    setAmountSecondsPass(secondsDifference);
                }
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    },[activeCycle,totalSeconds,activeCycleId]);

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
                <CountDown/>
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