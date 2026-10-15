import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
    palette:{
        mode:"dark",
        primary:{
            main:"#8ec42f"
        },
        secondary:{
            main:"#ff5722"
        },
        black:{
            main:"#242B2E"
        },
        background:{
            main:"#000000",
            default:"#0D0D0D",
            paper:"#0D0D0D"
        },
        textColor:{
            main:"#11111"
        }
    }
})