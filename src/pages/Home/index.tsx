import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { createContext, useState } from "react";
import { CountDown } from "./components/CountDown";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { NewCycleForm } from "./components/NewCycleForm";

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
    amountSecondsPass: number,
    setSecondsPassed: (seconds: number) => void
    markCurrentCycleAsFinished: () => void
}

const newCycleSchema = z.object({
    task: z.string().min(1, "Informe a Tarefa").max(50),
    minutesAmount: z.number().int()
        .min(1,"O ciclo deve ser de no mínimo 1 minuto. ")
        .max(60, "O ciclo deve ser de no máximo 60 minutos. "),
});


type NewCycleFormData = z.infer<typeof newCycleSchema> 


export const CyclesContext = createContext({} as CyclesContextData);

export function Home(){
    
    const [cycles,setCycles] = useState<Cycle[]>([]);
    const [activeCycleId,setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPass, setAmountSecondsPass] = useState(0);
  
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);
    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0,
        }
                
    });
    
    const { watch, reset, handleSubmit } = newCycleForm;

    
    function markCurrentCycleAsFinished(){
        setCycles(prevCycles => prevCycles.map(cycle => {
            if(cycle.id === activeCycleId){
                return {...cycle, finishDate: new Date()};
            }
            return cycle;
        }));
    }

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

    function setSecondsPassed(seconds: number){
        setAmountSecondsPass(seconds);
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

   
    const task = watch("task");

    const isSubmitDisabled = !task;


    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateCycle)}>
                <CyclesContext.Provider 
                    value={
                        {
                            activeCycle,
                            activeCycleId,
                            markCurrentCycleAsFinished,
                            amountSecondsPass,
                            setSecondsPassed
                        }
                    }
                >
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm/>
                    </FormProvider>
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
                        <StartCountdownButton disabled={isSubmitDisabled}  type="submit">
                            <Play size={24}/> Começar
                        </StartCountdownButton>
                    )
                }
            </form>
        </HomeContainer>
    );
}