import React from "react";
import PropTypes from 'prop-types'
import ResultTableHead from './ResultTableHead'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Toolbar,
  Typography
} from "@material-ui/core/es/index";
import './ResultTable.css'
import {getSorting, stableSort} from "../../utilities";

class ResultTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'title',
    page: 0,
    rowsPerPage: 10,
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({order, orderBy});
  };

  handleClick = (event, url) => {
    window.open(url, "_blank");
  };

  handleChangePage = (event, page) => {
    this.setState({page});
  };

  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage: event.target.value});
  };

  render() {
    const {order, orderBy, rowsPerPage, page} = this.state;
    const data = this.props.data;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className="Result-Table">
        <Toolbar>
          <Typography variant="h6" id="tableTitle">
            Suchergebnisse
          </Typography>
        </Toolbar>
        <div className="table-wrapper">
          <Table className="table" aria-labelledby="tableTitle">
            <ResultTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.url)}
                      tabIndex={-1}
                      key={n.movie_id}
                    >
                      <TableCell component="th" scope="row" padding="none">
                        {n.title}
                      </TableCell>
                      <TableCell align="right">{n.rating}</TableCell>
                      <TableCell align="right">{n.imdb}</TableCell>
                      <TableCell align="right">{n.year}</TableCell>
                      <TableCell align="right">{n.genres.map(e => e + " ")}</TableCell>
                      <TableCell align="right">{n.fsk}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{height: 49 * emptyRows}}>
                  <TableCell colSpan={6}/>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

ResultTable.propTypes = {
  data: PropTypes.array.isRequired
};

export default ResultTable;