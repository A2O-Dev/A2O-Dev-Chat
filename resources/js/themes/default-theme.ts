import { createTheme, Theme } from '@mui/material/styles'

const themeMUI: Theme = createTheme()
const customTheme: Theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3'
    }
  }
})

export const defaultTheme: Theme = createTheme({
  ...themeMUI,
  ...customTheme
})
