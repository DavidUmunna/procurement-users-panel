module.exports = {
    ...jest.requireActual('react-router-dom'),
    Link: ({ children, to }) => <a href={to}>{children}</a>,
    useNavigate: () => jest.fn(),
  };