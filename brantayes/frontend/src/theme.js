import { createMuiTheme } from '@material-ui/core/styles';
import { blue, blueGrey} from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            // main: blue[700],
            main: blueGrey[900],
            contrastText: '#fff',
        },
        secondary: {
            light: blue[50],
            main: blue[50],
            dark: blue[50],
            contrastText: blue[50],
        },
    },
});

export default theme