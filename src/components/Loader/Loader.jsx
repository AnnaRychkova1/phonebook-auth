import { MagnifyingGlass } from 'react-loader-spinner';

// import css from './Loader.module.css';

const Loader = () => {
  return (
    <MagnifyingGlass
      visible={true}
      height="80"
      width="80"
      ariaLabel="magnifying-glass-loading"
      wrapperStyle={{}}
      wrapperClass="magnifying-glass-wrapper"
      glassColor="#f9e3cc"
      color="#ef5c0d"
    />
  );
};

export default Loader;
