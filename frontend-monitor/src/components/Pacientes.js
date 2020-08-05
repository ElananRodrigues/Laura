import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, Box, Collapse, TextField,
    Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow,
    Typography, Paper, TablePagination
} from '@material-ui/core';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


const useRowStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    button: {
        margin: theme.spacing(1),
        background: "#0099E9",
        color: "#FFF"
    },
    buttonEvolucao: {
        margin: theme.spacing(1),
        background: "#FFF",
        color: "#0099E9"
    },

    search: {
        width: '80%'
    },
    vermelho: {
        background: "#FFCCD3",
        border: "1px solid #EC2C47",
        color: "#EC2C47",
        borderRadius: "5px"
    },
    amarelo: {
        background: "#FFF7D5",
        border: "1px solid #F6C500",
        color: "#F6C500",
        borderRadius: "5px"
    },
    azul: {
        background: "#00bfff",
        border: "1px solid #0099E9",
        color: "#0099E9",
        borderRadius: "5px"
    },
    cinza: {
        background: "#E3E3E3",
        border: "1px solid #333",
        color: "#333",
        borderRadius: "5px"
    },
    realizado: {
        color: "#1C7D00"
    },
    pendente: {
        color: "#FF881F"
    },
    semcor: {
        color: "#333"
    }
}))

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell component="th" scope="row">
                    {row.prontuario}
                </TableCell>
                <TableCell align="right">{row.nome}</TableCell>
                <TableCell align="center">
                    {
                        (row.nivel === 'vermelho') ? (<div className={classes.vermelho}> {row.nivel} </div>) : (<div className={classes.cinza}> {row.nivel} </div>) ||
                            (row.nivel === 'amarelo') ? (<div className={classes.amarelo}> {row.nivel} </div>) : (<div className={classes.cinza}> {row.nivel} </div>) ||
                                (row.nivel === 'azul') ? (<div className={classes.azul}> {row.nivel} </div>) : (<div className={classes.cinza}> {row.nivel} </div>) ||
                                    (row.nivel === 'cinza') ? (<div className={classes.cinza}> {row.nivel} </div>) : (<div className={classes.cinza}> {row.nivel} </div>)
                    }
                </TableCell>
                <TableCell align="right">{row.data}</TableCell>
                <TableCell align="right">
                    {
                        (row.atendimento === "Realizado") ? (<div className={classes.realizado}> {row.atendimento}</div>) : (<div className={classes.semcor}> {row.atendimento}</div>) ||
                            (row.atendimento === "Pendente") ? (<div className={classes.pendente}> {row.atendimento}</div>) : (<div className={classes.semcor}> {row.atendimento}</div>)
                    }
                </TableCell>
                <TableCell align="right">
                    <Button
                        variant="contained"
                        className={classes.buttonEvolucao}>
                        Registrar evolução
                    </Button>
                    <Button
                        variant="contained"
                        className={classes.button}
                        endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        onClick={() => setOpen(!open)}>
                        Resumo do Alerta
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Sintomas do alerta vermelho:
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Dor de cabeça</TableCell>
                                        <TableCell>Coceira no braço</TableCell>
                                        <TableCell>Coceira no perna</TableCell>
                                        <TableCell>Tosse</TableCell>
                                        <TableCell>Fraqueza nas pernas</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.sintomas.map((sintoma) => (
                                        <TableRow key={sintoma.cabeca}>
                                            <TableCell>{sintoma.cabeca}</TableCell>
                                            <TableCell >{sintoma.braco}</TableCell>
                                            <TableCell >{sintoma.perna}</TableCell>
                                            <TableCell >{sintoma.tosse}</TableCell>
                                            <TableCell >{sintoma.fraqueza}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment >
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        sintomas: PropTypes.arrayOf(
            PropTypes.shape({
                cabeca: PropTypes.string.isRequired,
                braco: PropTypes.string.isRequired,
                perna: PropTypes.string.isRequired,
                tosse: PropTypes.string.isRequired,
                fraqueza: PropTypes.string.isRequired
            }),
        ).isRequired,
        prontuario: PropTypes.string.isRequired,
        nome: PropTypes.string.isRequired,
        nivel: PropTypes.string.isRequired,
        data: PropTypes.string.isRequired,
        atendimento: PropTypes.string.isRequired,
    }).isRequired,
};

export default function Pacientes(props) {

    const classes = useRowStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div >
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Prontuário</TableCell>
                            <TableCell align="left">Nome</TableCell>
                            <TableCell align="right">Nível do Alerta</TableCell>
                            <TableCell align="right">Data do Alerta</TableCell>
                            <TableCell align="right">Atendimento</TableCell>
                            <TableCell align="right">
                                <form noValidate autoComplete="off">
                                    <TextField className={classes.search} id="outlined-basic" label="Pesquisar" />
                                </form>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.pacientes.map((row) => (
                            <Row key={row.id} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={props.pacientes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div >
    );
}