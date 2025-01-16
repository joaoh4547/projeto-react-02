import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { useForm } from "react-hook-form";

export function Home(){
    const {register, handleSubmit, watch} = useForm();

    const task = watch("task");

    const isSubmitDisabled = !task;

    function handleCreateCycle(data: unknown){
        console.log(data);
    }
    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateCycle)}>
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