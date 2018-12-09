import React, { Component } from 'react';
import PropTypes from 'prop-types';
import highlight from 'highlight.js';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  codeBlock: {
    margin: '27px 0px',
    '& code': {
      borderRadius: '4px',
    },
  },
};

class Highlight extends Component {
  constructor(props) {
    super(props);
    this.code = React.createRef();
  }

  componentDidMount() {
    highlight.highlightBlock(this.code.current);
  }

  render() {
    const { children, classes, language } = this.props;

    return (
      <pre className={classes.codeBlock}>
        <code className={language} ref={this.code}>
          {children}
        </code>
      </pre>
    );
  }
}

Highlight.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  language: PropTypes.string,
};

Highlight.defaultProps = {
  children: <div />,
  language: 'javascript',
};

export default withStyles(styles)(Highlight);
