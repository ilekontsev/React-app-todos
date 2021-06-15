import React, { PureComponent } from 'react';
import './Footer.css';
import PropTypes from 'prop-types';

class Footer extends PureComponent {
  render() {
    return (
      <div className={this.props.tasks.length ? 'footer' : 'gone'}>
        <div className="items">
          {this.props.items}
          {' '}
          items left
        </div>
        <div className="box">
          <div
            role="presentation"
            className={this.props.filterValue === 'all' ? 'filter activeFilter' : 'filter'}
            onClick={() => this.props.applyFilter('all')}
          >
            All
          </div>
          <div
            role="presentation"
            className={this.props.filterValue === 'active' ? 'filter activeFilter' : 'filter'}
            onClick={() => this.props.applyFilter('active')}
          >
            Active
          </div>
          <div
            role="presentation"
            className={this.props.filterValue === 'completed' ? 'filter activeFilter' : 'filter'}
            onClick={() => this.props.applyFilter('completed')}
          >
            Completed
          </div>
        </div>
        <div
          role="presentation"
          className={this.props.items === this.props.tasks.length ? 'hidden' : 'clear'}
          onClick={this.props.clearDel}
        >
          Clear completed
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  clearDel: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf.isRequired,
  applyFilter: PropTypes.func.isRequired,
  filterValue: PropTypes.string.isRequired,
  items: PropTypes.func.isRequired,
};

export default Footer;
