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
import {arrayBufferToBase64, getSorting, stableSort} from "../../utilities";
import VoteButton from "../VoteButton/VoteButton";

class ResultTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'title',
    page: 0,
    rowsPerPage: 10,
    hovered: {}
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
    if (event.target.type !== "button") {
      window.open(url, "_blank");
    }
  };

  handleChangePage = (event, page) => {
    this.setState({page});
  };

  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage: event.target.value});
  };

  handleRowHover = (movie_id, enter) => {
    let newHovered = this.state.hovered;
    if (enter) {
      newHovered[movie_id] = true;

      this.setState({
        hovered: newHovered
      });
    }
    else {
      newHovered[movie_id] = false;

      this.setState({
        hovered: newHovered
      })
    }
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

                  const movieId = n.movie_id;
                  let genres = n.genres;
                  if (genres == null) {
                    genres = [];
                  }
                  return (
                    <TableRow
                      hover
                      onMouseEnter={() => this.handleRowHover(movieId, true)}
                      onMouseLeave={() => this.handleRowHover(movieId, false)}
                      className="pointer"
                      tabIndex={-1}
                      key={movieId}
                    >
                      <TableCell
                        onClick={event => this.handleClick(event, n.url)}
                        component="th"
                        scope="row"
                        padding="none"
                      >
                        <img className="poster" style={{height: `${this.state.hovered[movieId] ? '100px' : '80px'}`}}
                             src={'data:image/jpeg;base64,' + arrayBufferToBase64(n.poster.data)} alt="None"/>
                      </TableCell>
                      <TableCell onClick={event => this.handleClick(event, n.url)} align="right">
                        {n.title}
                      </TableCell>
                      <TableCell onClick={event => this.handleClick(event, n.url)}
                                 align="right">{n.star_rating}</TableCell>
                      <TableCell onClick={event => this.handleClick(event, n.url)}
                                 align="right">{n.imdb_rating}</TableCell>
                      <TableCell onClick={event => this.handleClick(event, n.url)} align="right">{n.year}</TableCell>
                      <TableCell onClick={event => this.handleClick(event, n.url)}
                                 align="right">{genres.join(', ')}</TableCell>
                      <TableCell onClick={event => this.handleClick(event, n.url)}
                                 align="right">{n.maturity_rating}</TableCell>
                      <TableCell align="right">
                        <VoteButton upVote={true} movieId={movieId} onVote={() => console.log("VOTE UP")}/>
                      </TableCell>
                      <TableCell align="right">
                        <VoteButton upVote={false} movieId={movieId} onVote={() => console.log("VOTE DOWN")}/>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{height: 49 * emptyRows}}>
                  <TableCell colSpan={7}/>
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