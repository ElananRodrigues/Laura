import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

export const Img = styled.img`
    width: 55px;
    height: 50px;
    margin-right: 100px;
`;

const useStyles = makeStyles((theme) => ({
    depositContext: {
        display: "flex",
        marginLeft: theme.spacing(5),
    },
    card: {
        display: "flex",
        alignItems: 'end',
        justifyContent: 'flex-end',
        padding: theme.spacing(3),
        border: "1px solid #FF881F",
        borderRadius: "5px"
    },
    informe: {
        textAlign: "end",

    }
}));

export default function Cards(props) {
    const classes = useStyles();
    return (
        <div className={classes.card}>
            <Img src={props.image} />
            <div className={classes.informe}>
                <Typography component="p" variant="h3">
                    <strong> {props.count}</strong>
                </Typography>
                <Typography color="textSecondary" className={classes.depositContext}>
                    {props.etapa}
                </Typography>
            </div>
        </div>
    );
}