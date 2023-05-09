import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {List, ListItem, ListItemText, Button} from '@material-ui/core';


export default function ProblemsList() {
    // const [problems, setProblems] = useState();
    const problems = [
        {
            id: 1,
            user_name: 'John Doe',
            user_email: 'johndoe@example.com',
            content: 'I am unable to log in to the website.'
        },
        {
            id: 2,
            user_name: 'Jane Smith',
            user_email: 'janesmith@example.com',
            content: 'The website is running very slowly and pages take a long time to load.'
        },
        {
            id: 3,
            user_name: 'Bob Johnson',
            user_email: 'bjohnson@example.com',
            content: 'I am seeing an error message when I try to submit a form on the website.'
        }
    ];
// TODO: Anna to add backend
    //  get problems list from fire base
    const onDelete = (id) => {
        // remove id from firebase
        console.log(id)
    }

    return (
        <div>
        <List>
            {problems.map((problem) => (
                <ListItem key={problem.id}>
                    <ListItemText primary={problem.content} secondary={`${problem.user_name} (${problem.user_email})`}/>
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

