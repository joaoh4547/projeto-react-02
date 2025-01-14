import { ThemeProvider } from "styled-components";
import { Button } from "./components/Buttons";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";


export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Button variant="primary" />
      <Button variant="secondary"/>
      <Button variant="danger"/>
      <Button variant="success" />
      <Button/>
    </ThemeProvider>
  )
}