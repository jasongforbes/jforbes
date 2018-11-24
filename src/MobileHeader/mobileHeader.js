import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import headshot from '../images/headshot.jpg';
import { HeaderImage } from '../Header';
import { Cancel, Menu } from '../icons';
import { SubscribeButton } from '../Subscribe';

const styles = theme => ({
  button: {
    padding: '12px 32px',
    alignSelf: 'flex-end',
  },
  callToAction: {
    paddingTop: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  link: {
    ...theme.typography.button,
    color: theme.palette.primary.main,
    '&.active li': {
      backgroundColor: '#EBEBEB',
    },
  },
  listItem: {
    padding: '16px',
  },
  menu: {
    backgroundColor: '#F8F8F8',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});

const MobileHeader = ({ classes, onToggleMenu, showMenu }) => (
  <React.Fragment>
    <div className={classes.menu}>
      <Button onClick={onToggleMenu} className={classes.button} aria-label="Open menu">
        <SvgIcon color="primary">
          <Menu />
        </SvgIcon>
      </Button>
    </div>
    <Drawer anchor="top" open={showMenu} onClose={onToggleMenu}>
      <div className={classes.menu}>
        <div className={classes.callToAction}>
          <SubscribeButton />
          <Button onClick={onToggleMenu} className={classes.button} aria-label="Close menu">
            <SvgIcon color="primary">
              <Cancel />
            </SvgIcon>
          </Button>
        </div>
        <List>
          <Divider />
          <NavLink className={classes.link} to="/" exact onClick={onToggleMenu}>
            <ListItem className={classes.listItem}>Writings</ListItem>
          </NavLink>
          <Divider />
          <NavLink className={classes.link} to="/about" onClick={onToggleMenu}>
            <ListItem className={classes.listItem}>About</ListItem>
          </NavLink>
          <Divider />
          <NavLink className={classes.link} to="/projects" onClick={onToggleMenu}>
            <ListItem className={classes.listItem}>Projects</ListItem>
          </NavLink>
        </List>
      </div>
    </Drawer>
    <HeaderImage headshot={headshot} />
  </React.Fragment>
);

MobileHeader.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onToggleMenu: PropTypes.func,
  showMenu: PropTypes.bool,
};

MobileHeader.defaultProps = {
  onToggleMenu: () => {},
  showMenu: false,
};

export default withStyles(styles)(MobileHeader);
