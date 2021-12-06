import '@fortawesome/fontawesome-free/css/all.min.css'
import {Backdrop, CircularProgress, unstable_createMuiStrictModeTheme} from '@mui/material'
import {ThemeProvider} from "@mui/material/styles"
import React, {createContext, MouseEvent, useState} from 'react'
import {useNavigate} from "react-router"
import {useStylesDefault} from "../style"

type AppContextType = {
    classes: any | undefined
    darkState: boolean
    appName: string
    handleTheme: () => void
    goToPage: (data: MouseEvent<HTMLElement>) => void
    handleBackdropClose: () => void
    handleBackdropToggle: () => void
}

interface Props {
    children: any
}

export const AppContext = createContext({} as AppContextType)

export function AppProvider({children}: Props) {
    const appName = 'Sistema Market Expert'

    const history = useNavigate()

    const classes = useStylesDefault()

    const [backdrop, setBackdrop] = useState<boolean>(false)

    const handleBackdropClose = () => {
        setBackdrop(false)
    }
    const handleBackdropToggle = () => {
        setBackdrop(!backdrop)
    }

    const darkMode = localStorage.getItem('darkMode')

    const [darkState, setDarkState] = useState<boolean>(darkMode !== null ? (darkMode === 'true' ? true : false) : false)
    const palletType = darkState ? "dark" : "light"

    const handleTheme = () => {
        const isDark: boolean = !darkState

        setDarkState(isDark)
        localStorage.setItem('darkMode', (isDark + ''))
    }

    const goToPage = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault()

        const {page} = (event.target as HTMLElement).dataset

        if (page !== undefined) {
            history(page)
        }
    }

    const darkTheme = unstable_createMuiStrictModeTheme({
        palette: {
            mode: palletType,
            primary: {
                main: '#273a4a',
                light: '#55dab3',
                contrastText: '#FFFFFF',
            },
            secondary: {
                main: '#01579b',
                contrastText: '#FFFFFF',
            },
        },
    })

    return (
        <ThemeProvider theme={darkTheme}>
            <AppContext.Provider value={{
                appName,
                darkState,
                handleTheme,
                classes,
                goToPage,
                handleBackdropClose,
                handleBackdropToggle
            }}>
                {children}
            </AppContext.Provider>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={backdrop}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </ThemeProvider>
    )
}
