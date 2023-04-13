// import { Container, Typography } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import useGetCenterContent from "../../hooks/useGetCenterContent";
//
// const useStyles = makeStyles((theme) => ({
//     container: {
//         marginTop: theme.spacing(6),
//         padding: theme.spacing(6),
//         backgroundColor: '#F7F7F7',
//         borderRadius: '10px',
//         boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
//         width: '100%',
//         maxWidth: '100%',
//     },
//     heading: {
//         color: '#0072C6',
//         fontWeight: 'bold',
//         marginBottom: theme.spacing(4),
//         textAlign: 'center',
//         textTransform: 'uppercase',
//         letterSpacing: '2px',
//     },
//     text: {
//         color: '#4F4F4F',
//         marginBottom: theme.spacing(3),
//         lineHeight: '1.5',
//     },
//     boldText: {
//         fontWeight: 'bold',
//     },
// }));
//
// const AboutUsPage = () => {
//     const classes = useStyles();
//     const { curContent, error } = useGetCenterContent("description")
//
//     return (
//         <Container className={classes.container}>
//             <Typography variant="h4" className={classes.heading}>
//                 About Us
//             </Typography>
//             <Typography variant="body1" className={classes.text}>
//                 <span className={classes.boldText}>ASPER-HUJI Innovate</span> {curContent[0]}
//             </Typography>
//             {/*<Typography variant="body1" className={classes.text}>*/}
//             {/*</Typography>*/}
//         </Container>
//     );
// };
//
// export default AboutUsPage;

import DisplayCenterContext from "../../components/DisplayCenterContext";

export default function AboutUs() {
    return (
        <DisplayCenterContext contentType={"description"} title={"About Us"} />
    )

}
