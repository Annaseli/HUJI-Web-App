import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

const AboutUsPage = () => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Typography variant="h4" className={classes.heading}>
                About Us
            </Typography>
            <Typography variant="body1" className={classes.text}>
                <span className={classes.boldText}>ASPER-HUJI Innovate</span> - The Hebrew University’s center for innovation and entrepreneurship, leverages the University’s innovation potential to solve substantial problems through entrepreneurship. The center promotes the University as a supportive environment for entrepreneurship, cultivates an entrepreneurial mindset and skills among students, researchers and staff and serves as a catalyst for the development of startups and social enterprises.
            </Typography>
            <Typography variant="body1" className={classes.text}>
                At ASPER-HUJI Innovate, entrepreneurship is a mindset, it is the ability to identify challenges and create solutions. Driven by the belief that everyone is born with the capability to become entrepreneurs and innovators and can generate new ideas to drive impact. The Center operates in three parallel tracks - INSPIRE: which promotes entrepreneurial culture and community while creating experience opportunities such as hackathons and competitions; LEARN: which emphasizes training students for skills and entrepreneurial thinking through courses and academic programs; and BUILD: which accompanies entrepreneurs in the process of developing start-ups and social enterprises through a variety of acceleration programs. These activities create a nexus point between academia and the world of innovation and entrepreneurship while strengthening our internal ecosystem and building bridges to the city, the country and the world.
            </Typography>
        </Container>
    );
};

export default AboutUsPage;
