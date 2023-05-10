import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Typography, Box} from '@material-ui/core';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../../firebase/config";
import Button from "../../components/Button.jsx";
const useStyles = makeStyles((theme) => ({

    formReport: {
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
            marginBottom: theme.spacing(2),
        },
    },
    submitButton: {
        alignSelf: 'center',
    },
    box: {
        height: 'auto',
        width: '80%',


    },
}));

export default function ReportProblem() {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [problem, setProblem] = useState("");
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        await addDoc(collection(db, "Problems"), {
            name,
            email,
            problem
        })
        setTimeout(400)
        setIsLoading(false);
        setSuccess(true)
        setName("");
        setEmail("");
        setProblem("");

    };

    return (
        <div>
            <Box className={classes.box}
                display="inline-block"
                 justifyContent="center"
                 alignItems="center"
                 flexDirection="column"
            >

                <Typography variant="h5" component="h2" gutterBottom className="title">
                    Report a Problem
                </Typography>
                <form onSubmit={handleSubmit} className={classes.formReport}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                    <TextField
                        label="Problem"
                        multiline
                        minRows={6}
                        variant="outlined"
                        value={problem}
                        onChange={(event) => setProblem(event.target.value)}
                        required
                    />
                    <hr style={{borderBottom: "1px solid #e0e0e0", marginBottom: "1rem"}}/>

                    <Button
                        type="submit"
                        // variant="contained"
                        // color="primary"
                        className={classes.submitButton}
                        disabled={isLoading}
                        style={{backgroundColor: '#211d42'}}
                    >
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </Button>

                </form>
                {success && (
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <CheckCircleIcon sx={{fontSize: "5rem", color: "green"}}/>
                        <p>Report was sent successfully.</p>
                    </div>
                )}
            </Box>
        </div>
    );
};
