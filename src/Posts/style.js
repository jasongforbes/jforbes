export default theme => ({
  indent: {
    padding: '0px 27px',
  },
  math: {
    ...theme.typography.body1,
    overflowX: 'auto',
    marginBottom: '0',
  },
  quote: {
    padding: '18px 27px',
    margin: '27px',
    backgroundColor: '#D8E6E7',
    borderRadius: '8px',
    '& p': {
      ...theme.typography.body1,
      color: '#5B626B',
    },
    '& .katex-display': {
      ...theme.typography.body1,
      color: '#5B626B',
    },
  },
});
