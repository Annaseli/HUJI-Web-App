import {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {List, ListItem, ListItemText} from '@material-ui/core';
import {SemiTitle} from "../../components/Title";
import {useCollection} from "../../hooks/useCollection";
import {collection, deleteDoc, doc} from "firebase/firestore";
import {db} from "../../firebase/config";

import Button from "../../components/Button.jsx";
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
                    <ListItemText primary={problem.problem} secondary={`${problem.name} (${problem.email})`}/>
                    <Button
                        onClick={() => onDelete(problem.id)}>
                        Delete
                    </Button>
                </ListItem>
            ))}
        </List>
        </div>
    );
}

