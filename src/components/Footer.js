
const FooterNav = () => {
  return (
    <div className='app-footer text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a href='/'><b>finotel-demo.web.app</b></a>
      </div>
  );
};

export default FooterNav;
