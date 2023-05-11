import {Container, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import useGetCenterContent from "../hooks/useGetCenterContent";
import {v4 as uuidv4} from 'uuid';
import Grid from "@material-ui/core/Grid";
import React from "react";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(6),
        padding: theme.spacing(6),
        backgroundColor: "#F7F7F7",
        borderRadius: "10px",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
        width: "93%",
        maxWidth: "93%",
        // justifyContent: "flex-start",
        // alignItems: "flex-start",
    },
    heading: {
        color: '#211D42',
        fontWeight: "bold",
        marginBottom: theme.spacing(4),
        // textAlign: "center",
        textTransform: "uppercase",
        letterSpacing: "2px",
    },

    boldText: {
        fontWeight: "bold",
    },
    sectionContent: {
        marginBottom: theme.spacing(3),
    },
    text: {
        color: "#4F4F4F",
        marginBottom: theme.spacing(3),
        lineHeight: "1.5",
        textAlign: "justify",
        width: "100%"
    },
    sectionTitle: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
}));

export default function DisplayCenterContext({contentType, title}) {
    const classes = useStyles();
    const {curContent, error, isPending} = useGetCenterContent(contentType);

    return (
        <div className={classes.container}>
            <Typography variant="h4" className={classes.heading}>
                {title}
            </Typography>
            {curContent?.map((content) => (
                <React.Fragment key={uuidv4()}>
                    <Grid item xs={12} md={12}>
                        {/*<Typography variant="h4" className={classes.sectionTitle}>*/}
                        {/*    HUJI innovate*/}
                        {/*</Typography>*/}
                        <Typography variant="body1" className={classes.text}>
                            {content}
                        </Typography>

                    </Grid>
                    {error && (
                        <div className={classes.text}>
                            <span className={classes.boldText}>Error:</span> {error}
                        </div>
                    )}
                </React.Fragment>
            ))}

        </div>
    );
}
