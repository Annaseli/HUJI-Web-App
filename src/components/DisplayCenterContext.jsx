import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useGetCenterContent from "../hooks/useGetCenterContent";
import { v4 as uuidv4 } from 'uuid';
import DisplayUsersRes from "./DisplayUsersRes";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(6),
        padding: theme.spacing(6),
        backgroundColor: '#F7F7F7',
        borderRadius: '10px',
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
        width: '100%',
        maxWidth: '100%',
    },
    heading: {
        color: '#0072C6',
        fontWeight: 'bold',
        marginBottom: theme.spacing(4),
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '2px',
    },
    text: {
        color: '#4F4F4F',
        marginBottom: theme.spacing(3),
        lineHeight: '1.5',
    },
    boldText: {
        fontWeight: 'bold',
    },
}));

export default function DisplayCenterContext({ contentType, title }) {
    const classes = useStyles();
    const { curContent, error } = useGetCenterContent(contentType)

    return (
        <Container className={classes.container}>
            <Typography variant="h4" className={classes.heading}>
                { title }
            </Typography>
            {curContent.map(content => (
                <div key={uuidv4()}>
                    {<Typography variant="body1" className={classes.text}>
                        <span className={classes.boldText}>ASPER-HUJI Innovate</span> {content}
                    </Typography>}
                </div>
            ))}
        </Container>
    );
};

