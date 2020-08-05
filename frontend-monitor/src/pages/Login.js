import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from '../context/AuthContext';
import logo from '../assets/logo/logo.png';
import styled from 'styled-components';

export const Img = styled.img``;

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '7%',
    },
    menssagem: {
        color: "red"
    },
    image: {
        marginTop: theme.spacing(-15),
        marginBottom: theme.spacing(3),
    },
    paper: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '77%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(4, 0, 5),
        padding: theme.spacing(1.3, 0, 1.3),
        background: "#0099E9",
        color: "#FFF"
    },
}));

export default function Login() {
    const classes = useStyles();
    const { handleLogin } = useContext(Context);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [mensagem, setMensagem] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    const autLogin = async (event) => {
        event.preventDefault();
        setMensagem("")

        const auth = await handleLogin().auth(email, password)

        if (!auth) {
            setMensagem("Seu e-mail ou senha esta incorreto!")
        }
    }

    return (
        <Grid container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.root}
            component="main">
            <CssBaseline />
            <Grid component={Paper} elevation={1} >
                <div className={classes.paper}>
                    <div className={classes.image}>
                        <Img src={logo} />
                    </div>
                    <form className={classes.form} noValidate onSubmit={autLogin}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                            disabled={!validateForm()}
                        >
                            Entrar
                        </Button>
                        <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center">
                            <Grid>
                                <Link href="/login" variant="body2">
                                    ESQUECEU A SENHA?
                                </Link>
                            </Grid>
                            <span className={classes.menssagem}>{mensagem}</span>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>

    );
}