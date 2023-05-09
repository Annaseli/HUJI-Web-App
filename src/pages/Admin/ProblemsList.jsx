import {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {List, ListItem, ListItemText, Button} from '@material-ui/core';
import {SemiTitle} from "../../components/Title";
import {useCollection} from "../../hooks/useCollection";
import {collection, deleteDoc, doc} from "firebase/firestore";
import {db} from "../../firebase/config";


export default function ProblemsList() {
    const { docs: problems, error: err } = useCollection("Problems")

    const onDelete = async (id) => {
        // remove the problem from "Problems" collection
        await deleteDoc(doc(collection(db, "Problems"), id));
    }

    problems && console.log(problems)
    return (
        <div>
            <SemiTitle>{ "Users Problems" }</SemiTitle>
            <List>
            {problems && problems.map((problem) => (
                <ListItem key={problem.id}>
                    <ListItemText primary={problem.content} secondary={`${problem.name} (${problem.email})`}/>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{backgroundColor: '#211d42'}}
                        onClick={() => onDelete(problem.id)}>
                        Delete
                    </Button>
                </ListItem>
            ))}
        </List>
        </div>
    );
}

