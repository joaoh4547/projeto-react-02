import styled from "styled-components";

export const HistoryContainer = styled.main`
    flex: 1;
    padding: 3.5rem;
    display: flex;
    flex-direction: column;

    h1{
        font-size: 1.5rem;
        color: ${p => p.theme["gray-100"]};
    }
`;

export const HistoryList = styled.main`
    flex: 1;
    overflow: auto;
    margin-top: 2rem;

    table{
        width: 100%;
        border-collapse: collapse;
        min-width: 600px;

        th{
            background-color: ${p => p.theme["gray-600"]};
            padding: 1rem;
            text-align: left;
            color: ${p => p.theme["gray-100"]};
            font-size: 0.875rem;
            line-height: 1.6;

            &:first-child{
                border-top-left-radius: 8px;
                padding-left: 1.5rem;
            }

            &:last-child{
                border-top-right-radius: 8px;
                padding-left: 1.5rem;
            }
        }
        td{
            background-color: ${p => p.theme["gray-700"]};
            border-top: 4px solid ${p => p.theme["gray-800"]};
            padding: 1rem;
            font-size: 0.875rem;
            line-height: 1.6;

            &:first-child{
                padding-left: 1.5rem;
                width: 50%;
            }

            &:last-child{
                padding-left: 1.5rem;
            }
        }
    }
`;