import { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    makeStyles,
} from '@material-ui/core';
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    card: {
        width: 300,
        height: 200,
        margin: theme.spacing(2),
        position: 'relative',
        borderRadius: '50%',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        transition: 'transform 0.2s',
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
    cardContent: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2),
    },
    name: {
        fontWeight: 'bold',
    },
    size: {
        fontSize: 14,
    },
}));

RoomCard.propTypes = {
    room: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        size: PropTypes.number.isRequired,
        isAvailable: PropTypes.string.isRequired,
    }).isRequired,
};

export function RoomCard({ room }) {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleCardClick = () => {
        setOpen(true);
    };

    const handlePopupClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Card className={classes.card} onClick={handleCardClick}
                  style={{backgroundColor: room.isAvailable === "true" ? 'green' : 'white'}}
            >
                <CardContent className={classes.cardContent}>
                    <Typography variant="h5" component="h2" className={classes.name}>
                        {room.name}
                    </Typography>
                    <Typography color="textSecondary" className={classes.size}>
                        Size: {room.size} sq. ft.
                    </Typography>
                </CardContent>
            </Card>
            <Dialog open={open} onClose={handlePopupClose}>
                <DialogTitle>{room.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {"This is the room's pop-up content."}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    { room.isAvailable === "true" &&
                        <Button onClick={handlePopupClose} color="primary">
                            Close
                        </Button>
                    }
                </DialogActions>
            </Dialog>
        </>
    );
}

