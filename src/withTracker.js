import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';

GoogleAnalytics.initialize('UA-98706803-1');

const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = (page) => {
    GoogleAnalytics.set({
      page,
      ...options,
    });
    GoogleAnalytics.pageview(page);
  };

  const getPage = location => location.pathname + location.search;

  const HOC = class extends Component {
    componentDidMount() {
      const { location } = this.props;
      trackPage(getPage(location));
    }

    componentDidUpdate(prevProps) {
      const { location } = this.props;
      const currentPage = getPage(prevProps.location);
      const nextPage = getPage(location);

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return HOC;
};

export default withTracker;
