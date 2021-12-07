import {useTheme} from '@mui/material';
import {makeStyles} from '@mui/styles';

export function useStylesDefault() {
    const drawerWidth = 240;

    const theme = useTheme();

    const useStyles: any = makeStyles(() => ({
        root: {
            display: 'flex',
            '& .MuiDataGrid-root': {
                backgroundColor: '#FFF'
            },
            '& .MuiGrid-grid-xs-12-164': {
                zIndex: 9
            },
            '& .MuiDataGrid-toolbarContainer': {
                display: 'block'
            },
            '& #perpage': {
                padding: 0,
                margin: 0
            },
            '& #perpage:hover': {
                border: 0
            },
            '& div#input-page-number': {
                paddingBottom: '5px'
            },
        },
        toolbar: {
            paddingRight: 24,
        },
        toolbarIcon: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px',
            ...theme.mixins.toolbar,
        },
        appBar: {
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButtonHidden: {
            display: 'none',
        },
        title: {
            flexGrow: 1,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        drawerPaper: {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerPaperClose: {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(7),
            },
        },
        appBarSpacer: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            height: '100vh',
            width: '100%',
            overflow: 'auto',
        },
        container: {
            paddingLeft: theme.spacing(5),
            paddingRight: theme.spacing(2),
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3),
        },
        paper: {
            padding: theme.spacing(2),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
        },
        fixedHeight: {
            height: 240,
        },

        grow: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        profileMenu: {
            marginTop: '50px',
        },
        userBotton: {
            borderRadius: 0,
            height: 48,
            textAlign: 'left',
        },
        profileMobileMenu: {
            paddingBottom: 12
        },
        popover: {
            pointerEvents: 'none',
        },
        themeModelIcon: {
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            cursor: 'pointer'
        },
        lightColor: {
            color: '#CCCCCC'
        },
        darkColor: {
            color: '#565656'
        },
        dashLogo: {
            height: '43px',
        },
        pointer: {
            cursor: 'pointer'
        },
        main: {
            paddingTop: theme.spacing(2),
        },
        fileUploadPreview: {
            width: '100%',
            height: theme.spacing(25),
            border: '1px solid #e0e0e0',
            borderRadius: 5,
        },
        fileUploadButton: {
            width: '100%',
            backgroundColor: '#e0e0e0',
            marginTop: 10
        },
        w100: {
            width: '100%'
        },
        formTitle: {
            paddingBottom: 20,
        },
        formFooter: {
            textAlign: 'right',
        },

        dataGrid: {
            background: "#FFFFFF",
            borderRadius: 3,
            border: 0,
            color: "#000000",
            minHeight: 300,
            overflow: "auto",
            padding: 2,
            width: "100%"
        },

        dataGripPerPage: {
            float: 'right',
            padding: '3px'
        },
        zIndex9: {
            zIndex: 9
        },
        perPageButton: {
            border: '0px',
            marginRight: '0px',
            paddingRight: '0px',
        },
        perPageButtonView: {
            border: '0px',
            marginRight: '0px',
            pointerEvents: 'none',
            fontSize: '11px',
            paddingRight: '5px',
        },
        backdrop: {
            zIndex: 9
        },
        paginationsBtn: {
            float: 'right',
            paddingTop: '16px'
        },
        paginationsNumber: {
            paddingBottom: '4px',
            paddingTop: '5px'
        },
        paginationFieldNumber: {
            paddingBottom: '0px',
            paddingTop: '0px'
        },
        totalPages: {
            marginTop:  theme.spacing(0)
        },
        pageNumber:{
            float: 'left',
            marginRight: '10px',
            height: '36px',
        }
    }));

    return useStyles();
}
