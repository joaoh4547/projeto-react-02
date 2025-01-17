import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

const newCycleSchema = z.object({
    task: z.string().min(1, "Informe a Tarefa").max(50),
    minutesAmount: z.number().int()
        .min(5,"O ciclo deve ser de no mínimo 1 minuto. ")
        .max(60, "O ciclo deve ser de no máximo 60 minutos. "),
});

type NewCycleFormData = z.infer<typeof newCycleSchema> 

interface Cycle{
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date
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

    useEffect(() =>{
        let interval : number;
        if(activeCycle){
            interval = setInterval(() => {
                setAmountSecondsPass(differenceInSeconds(new Date(), activeCycle.startDate));
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    },[activeCycle]);

    const task = watch("task");

    const isSubmitDisabled = !task;

    
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
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
    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateCycle)} action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput 
                        id="task"
                        placeholder="Dê um nome para o seu projeto"
                        list="tasks"
                        {...register("task")}
                    />
                    <datalist id="tasks">
                        <option value="Projeto 1" />
                        <option value="Projeto 2" />
                        <option value="Projeto 3" />
                        <option value="Projeto 4" />
                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput 
                        type="number"
                        id="minutesAmount"
                        placeholder="00"
                        step={5}
                        min={5}
                        max={60}
                        {...register("minutesAmount",{ valueAsNumber: true})}
                    />
                    <span>minutos.</span>
                </FormContainer>
                <CountDownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountDownContainer>
                <StartCountdownButton disabled={isSubmitDisabled}  type="submit">
                    <Play size={24}/> Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    );
}