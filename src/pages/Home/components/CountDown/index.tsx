import { useEffect, useState } from "react";
import { CountDownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";

interface CountDownProps{
    // eslint-disable-next-line
    activeCycle: any;
      
    setCycles: any
    activeCycleId: string | null;
}

export function CountDown({activeCycle, setCycles,activeCycleId}: CountDownProps){

    const [amountSecondsPass, setAmountSecondsPass] = useState(0);
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

    return (
        <CountDownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountDownContainer>
    );
}