import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { CountDown } from "./components/CountDown";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { NewCycleForm } from "./components/NewCycleForm";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";

const newCycleSchema = z.object({
    task: z.string().min(1, "Informe a Tarefa").max(50),
    minutesAmount: z.number().int()
        .min(1,"O ciclo deve ser de no mínimo 1 minuto. ")
        .max(60, "O ciclo deve ser de no máximo 60 minutos. "),
});


type NewCycleFormData = z.infer<typeof newCycleSchema> 

export function Home(){
    
    const {createCycle, activeCycle, interruptCurrentCycle} = useContext(CyclesContext);
   
    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0,
        }
                
    });
    
    const { watch, reset, handleSubmit } = newCycleForm;
   
    const task = watch("task");

    const isSubmitDisabled = !task;

    function handleCreateNewCycle(data: NewCycleFormData){
        createCycle(data);
        reset();
    }

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormProvider {...newCycleForm}>
                    <NewCycleForm/>
                </FormProvider>
                <CountDown />
                {
                    activeCycle ? (
                        <StopCountdownButton 
                            onClick={interruptCurrentCycle} 
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