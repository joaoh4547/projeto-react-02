import styled from "styled-components";

export const HomeContainer = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form {
        display: flex;
        flex-direction: column;
        align-items: center ;
        gap: 3.5rem;
    }
`;

export const BaseCountdownButton = styled.button`
    width: 100%;
    border: 0;
    padding: 1rem;
    border-radius: 8px;

    display: flex;
    justify-content: center;
    align-items: center;

    gap: 0.5rem;
    font-weight: bold;

    cursor: pointer;
    color: ${p => p.theme["gray-100"]};
    transition: background-color 0.1s;

    &:disabled{
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

export const StartCountdownButton = styled(BaseCountdownButton)`
    background-color: ${p => p.theme["green-500"]};

    &:hover:not(:disabled){
        background-color: ${p => p.theme["green-700"]};
    }
`;


export const StopCountdownButton = styled(BaseCountdownButton)`
 background-color: ${p => p.theme["red-500"]};
    

    &:hover:not(:disabled){
        background-color: ${p => p.theme["red-700"]};
    }
`;