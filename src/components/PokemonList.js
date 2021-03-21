import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  Container,
  Grid,
  Box,
  Tooltip,
  TextField,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import { ROUTES, SPECIAL_ATTACKS } from '../constants';
import { POKEMON_COLUMNS } from '../constants/table-head';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function PokemonList({
  changePage,
  changeRowsPerPage,
  page,
  rowsPerPage,
  totalRows,
  getPokemons,
  getPokemonByName,
  pokemons,
  deletePokemon,
  setPokemon,
}) {
  const classes = useStyles();

  const history = useHistory();
  const [pokemonSearch, setPokemonSearch] = useState();

  useEffect(() => {
    getPokemons();
  }, []);

  const handleChangePage = (event, newPage) => {
    changePage(newPage);
    getPokemons();
  };

  const handleChangeRowsPerPage = (event) => {
    changeRowsPerPage(+event.target.value);
    changePage(0);
    getPokemons();
  };

  const editPokemon = (pokemon) => {
    const { _id, Name, Generation, Types } = pokemon;

    const attacksArray = [];

    if (pokemon[SPECIAL_ATTACKS].length !== 0) {
      pokemon[SPECIAL_ATTACKS].forEach((each) => {
        attacksArray.push(each.Name);
      });
    }

    setPokemon({
      _id,
      name: Name,
      generation: Generation.split(' ').splice(-1).toString(),
      types: Types.join(),
      attacks: attacksArray.join() || pokemon[SPECIAL_ATTACKS],
    });
    history.push(ROUTES.POKEMON_CREATE_UPDATE);
  };

  return (
    <Container component="main" maxWidth="md">
      <TextField
        autoComplete="name"
        name="name"
        value={pokemonSearch}
        variant="outlined"
        required
        fullWidth
        id="name"
        label="Procure seu Pokemon"
        onChange={(e) => getPokemonByName(e.target.value)}
      />
      <br />
      <br />
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {POKEMON_COLUMNS.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {pokemons &&
                pokemons.map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {POKEMON_COLUMNS.map((column) => {
                        const value =
                          column.id === SPECIAL_ATTACKS
                            ? row[column.id].length
                            : column.id === 'Types'
                            ? row[column.id].join(', ')
                            : column.id === 'Generation'
                            ? row[column.id].split(' ').splice(-1)
                            : row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format ? column.format(value) : value}

                            {column.id === 'actions' ? (
                              <>
                                <Tooltip title="Excluir">
                                  <IconButton
                                    onClick={() => {
                                      deletePokemon(row._id);
                                      setPokemonSearch('');
                                    }}
                                  >
                                    <CancelIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Editar">
                                  <IconButton onClick={() => editPokemon(row)}>
                                    <EditIcon />
                                  </IconButton>
                                </Tooltip>
                              </>
                            ) : (
                              ''
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage="Registros por Página"
          nextIconButtonText="Próxima Página"
          backIconButtonText="Página Anterior"
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Box m={2}>
        <Grid container justify="center">
          <a href={ROUTES.POKEMON_CREATE_UPDATE}>
            <small>Criar novo Pokemon</small>
          </a>
        </Grid>
      </Box>

      <Grid container justify="flex-end"></Grid>
    </Container>
  );
}
