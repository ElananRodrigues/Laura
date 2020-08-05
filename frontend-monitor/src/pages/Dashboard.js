import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import CloudUploadIcon from '@material-ui/icons/ExitToApp';

import {
    AppBar, Toolbar, Typography,
    Container, Button, Grid, Paper
} from '@material-ui/core';

import graphql from '../graphql'
import { Pacientes } from '../graphql/query'

import styled from 'styled-components';

import logo from '../assets/dashboard/grupo.png'
import etapa1 from '../assets/etapa1/etapa1.png'
import etapa2 from '../assets/etapa2/etapa2.png'
import etapa3 from '../assets/etapa3/etapa3.png'
import etapa4 from '../assets/etapa4/etapa4.png'


import Cards from '../components/Cards'
import PacientesTable from '../components/Pacientes'

import { Context } from '../context/AuthContext';

export const Img = styled.img``;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
        background: "#FF881F"
    },
    button: {
        color: "#fff"
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function Dashboard() {
    const classes = useStyles();
    const { handleLogout } = useContext(Context);
    const [pacientes, setPacientes] = useState([]);

    const [countEtapa1, setEtapa1] = useState(0);
    const [countEtapa2, setEtapa2] = useState(0);
    const [countEtapa3, setEtapa3] = useState(0);
    const [countEtapa4, setEtapa4] = useState(0);

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('token');

            if (token) {
                graphql.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;

                const data = (
                    await (await graphql.post("/graphql", JSON.stringify({ query: Pacientes() }))).status === 200
                )
                    ? (graphql.post("/graphql", JSON.stringify({ query: Pacientes() })))
                    : [];

                data.then(response => {
                    return response.data.data
                }).then(data => {
                    let rea = 0
                    let pen = 0
                    let evo = 0
                    if (data) {
                        setEtapa1(data.getPacientes.length)

                        data.getPacientes.map((paciente) => {
                            if (paciente.atendimento === "Realizado") { rea = rea + 1 }
                            if (paciente.atendimento === "Pendente") { pen = pen + 1 }

                            setEtapa2(pen)
                            setEtapa3(rea)
                            setEtapa4(evo)

                            return {}
                        })
                        setPacientes(data.getPacientes)
                    }
                })
            }
        })();
    }, []);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" >
                <Toolbar className={classes.toolbar}>
                    <div><Img src={logo} /></div>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}></Typography>
                    <Button
                        className={classes.button}
                        startIcon={<CloudUploadIcon />}
                        onClick={handleLogout}
                    >
                        Sair
                        </Button>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper >
                                <Cards
                                    etapa="Etapa1"
                                    count={countEtapa1}
                                    image={etapa1}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper >
                                <Cards
                                    etapa="Etapa2"
                                    count={countEtapa2}
                                    image={etapa2}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper >
                                <Cards
                                    etapa="Etapa3"
                                    count={countEtapa3}
                                    image={etapa3}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper >
                                <Cards
                                    etapa="Etapa4"
                                    count={countEtapa4}
                                    image={etapa4}
                                />
                            </Paper>
                        </Grid>

                        <Grid item xs={12} >
                            <Paper >
                                <PacientesTable pacientes={pacientes} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>

            {/* <ul>
                        {pacientes.map((paciente) =>
                            (
                                <li key={paciente.protuario}>
                                    <br />
                                    <span>{paciente.protuario}</span>
                                    <br />
                                    <span>{paciente.nome}</span>
                                    <br />
                                    <span>{paciente.nivel}</span>
                                    <br />
                                    <span>{paciente.atendimento}</span>
                                    <br />
                                    <span>{paciente.data}</span>
                                </li>
                            )
                        )}
                    </ul> */}
        </div>
    );
}
