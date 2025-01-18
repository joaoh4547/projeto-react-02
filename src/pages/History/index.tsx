import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

export function History(){
    const { cycles } = useContext(CyclesContext);
    return (
        <HistoryContainer>
            <h1>Meu Histórico</h1>
            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Inicio</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cycles.map(cycle =>(
                                <tr key={cycle.id}>
                                    <td>{cycle.task}</td>
                                    <td>{cycle.minutesAmount} minutos</td>
                                    <td>{formatDistanceToNow(cycle.startDate,{ addSuffix: true, locale: ptBR})}</td>
                                    <td>
                                        <Status statusColor={
                                            cycle.interruptDate ? "red" :
                                                cycle.finishDate ? "green" :
                                                    "yellow"
                                        }>
                                            {cycle.interruptDate ? "Interrompido" : cycle.finishDate ? "Finalizado" : "Em andamento"}
                                        </Status>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    );
}