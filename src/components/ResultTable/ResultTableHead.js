import React from "react";
import PropTypes from 'prop-types';
import {TableCell, TableHead, TableRow, TableSortLabel, Tooltip} from "@material-ui/core/es/index";

const rows = [
  {id: 'poster', numeric: false, disablePadding: true, label: ''},
  {id: 'title', numeric: false, disablePadding: false, label: 'Titel'},
  {id: 'star_rating', numeric: true, disablePadding: false, label: 'Bewertung (1.0 - 5.0)'},
  {id: 'imdb_rating', numeric: true, disablePadding: false, label: 'IMDb (1.0 - 10.0)'},
  {id: 'year', numeric: true, disablePadding: false, label: 'Jahr'},
  {id: 'genres', numeric: false, disablePadding: false, label: 'Genres'},
  {id: 'maturity_rating', numeric: false, disablePadding: false, label: 'FSK'},
];

class ResultTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {order, orderBy} = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

ResultTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default ResultTableHead;