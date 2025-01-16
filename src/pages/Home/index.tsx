import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { FormEvent, useState } from "react";

export function Home(){
    const [task, setTask] = useState("");

    function handleSubmit(event: FormEvent){
        event.preventDefault();

    }
    return (
        <HomeContainer>
            <form onSubmit={handleSubmit}>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput 
                        id="task"
                        name="task"
                        placeholder="Dê um nome para o seu projeto"
                        list="tasks"
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
                <StartCountdownButton disabled={task.trim().length === 0} type="submit">
                    <Play size={24}/> Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    );
}