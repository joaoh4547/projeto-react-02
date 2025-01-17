import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

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
    minutesAmount: number
}

export function Home(){
    
    const [cycles,setCycles] = useState<Cycle[]>([]);
    const [activeCycleId,setActiveCycleId] = useState<string | null>(null);
    
    const {register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0,
        }
    });

    const task = watch("task");

    const isSubmitDisabled = !task;

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    console.log(activeCycle);

    function handleCreateCycle(data: NewCycleFormData){
        const id =  String(new Date().getTime());
        const newCycle : Cycle ={
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
        };

        setCycles(prevCycles => [...prevCycles, newCycle]);
        setActiveCycleId(id);
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
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountDownContainer>
                <StartCountdownButton disabled={isSubmitDisabled}  type="submit">
                    <Play size={24}/> Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    );
}