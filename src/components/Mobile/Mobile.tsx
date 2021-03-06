import { Router } from '@reach/router';
import React, { useContext } from 'react';
import Loading from 'react-loading';
import SharedContext from '../../services/context-store';
import AdminBlogList from '../shared/AdminBlogList/AdminBlogList';
import AdminPanel from '../shared/AdminPanel/AdminPanel';
import Blog from '../shared/Blog/Blog';
import Blogs from '../shared/Blogs/Blogs';
import Error from '../shared/Error/Error';
import Footer from '../shared/Footer/Footer';
import NewBlog from '../shared/NewBlog/NewBlog';
import Unavailable from '../shared/Unavailable/Unavailable';
import styles from './Mobile.module.css';

const Mobile: React.FC = () => {
  const ctx = useContext(SharedContext);

  return (<>
    {ctx.infoMessage.length > 0 ? <Error/> : null}
    {ctx.loading ? <Loading/> : null}
    {/* <NavbarMobile/> */}
    <Router className={styles.router}>
      {/* <HomeMobile path="/"/> */}
      {/* <HomeMobile path="/home"/> */}
      <Blogs      path="/blogs"/>
      {/* <Shop       path="/shop"/> */}
      <Blog       path="/blogs/blog"/>
      <NewBlog    path="/blogs/add"/>
      {/* <Login      path="/login"/> */}
      {/* <AboutMobile path="/about"/> */}
      <AdminPanel path="/admin"/>
      {/* <NewSlogan  path="/slogans/add"/> */}
      <AdminBlogList path="/admin/blogs"/>
      {/* <NewCategory path="/admin/category/add"/> */}
      <Unavailable path="/unavailable"/>
    </Router>
    <Footer/>
  </>)
};

export default Mobile;
