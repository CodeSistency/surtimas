// import Register from './components/Register';
// import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
// import Editor from './components/Editor';
// import Admin from './components/Admin';
// import Missing from './components/Missing';
// import Unauthorized from './components/Unauthorized';
// import Lounge from './components/Lounge';
// import LinkPage from './components/LinkPage';
// import RequireAuth from './components/RequireAuth';
// import PersistLogin from './components/PersistLogin';
import { Routes, Route } from 'react-router-dom';
// import Posts from './components/Posts';
// import CreatePost from './components/CreatePost';
// import UpdatePost from './components/UpdatePost';
// import BarCodeGen from './components/BarCodeGen';
// import Reader from './components/Reader';
// import CreateProduct from './components/CreateProduct';
// import UpdateProduct from './components/UpdateProduct';
// import Products from './components/Products';
// import QRcodes from './components/QRcodes';
// import Cart from './pages/Cart';
// import ProductDetail from './pages/ProductDetail';
// import AllProducts from './pages/AllProducts';

// import Login2 from './components/Login2';
// import Register2 from './components/Register2';
// import Genero from './pages/Genero';
// import Tipo from './pages/Tipo';
import { lazy } from 'react';


const Register = lazy(() => import('./components/Register'));
const Login = lazy(() => import('./components/Login'));
// const Home = lazy(() => import('./components/Home'));
// const Layout = lazy(() => import('./components/Layout'));
const Editor = lazy(() => import('./components/Editor'));
const Admin = lazy(() => import('./components/Admin'));
const Missing = lazy(() => import('./components/Missing'));
const Unauthorized = lazy(() => import('./components/Unauthorized'));
const Lounge = lazy(() => import('./components/Lounge'));
const LinkPage = lazy(() => import('./components/LinkPage'));
const RequireAuth = lazy(() => import('./components/RequireAuth'));
const PersistLogin = lazy(() => import('./components/PersistLogin'));
const Posts = lazy(() => import('./components/Posts'));
const CreatePost = lazy(() => import('./components/CreatePost'));
const UpdatePost = lazy(() => import('./components/UpdatePost'));
const BarCodeGen = lazy(() => import('./components/BarCodeGen'));
const Reader = lazy(() => import('./components/Reader'));
const CreateProduct = lazy(() => import('./components/CreateProduct'));
const UpdateProduct = lazy(() => import('./components/UpdateProduct'));
const Products = lazy(() => import('./components/Products'));
const QRcodes = lazy(() => import('./components/QRcodes'));
const Cart = lazy(() => import('./pages/Cart'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const AllProducts = lazy(() => import('./pages/AllProducts'));
const Login2 = lazy(() => import('./components/Login2'));
const Register2 = lazy(() => import('./components/Register2'));
const Genero = lazy(() => import('./pages/Genero'));
const Tipo = lazy(() => import('./pages/Tipo'))


const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="sesion" element={<Login2 />} />
        <Route path="registro" element={<Register />} />
        <Route path="register" element={<Register2 />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<AllProducts />} />
        <Route path="/genero/:genero" element={<Genero />} />
        <Route path="/tipo/:tipo" element={<Tipo />} />
        <Route path="/productos/:id" element={<ProductDetail />} />
        {/* <Route path="/carrito" element={<Cart />} /> */}

        

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/home" element={<Home />} />
            {/* <Route path="/carrito" element={<Cart />} /> */}
            <Route path="home/productos/:id" element={<ProductDetail />} />
            <Route path="home/genero/:genero" element={<Genero />} />
            <Route path="home/tipo/:tipo" element={<Tipo />} />
            <Route path="home/carrito/:username" element={<Cart />} />
            <Route path="home/productos" element={<AllProducts />} />
            
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>


          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
            <Route path="admin/createPost" element={<CreatePost />} />
            <Route path="admin/updatePost/:id" element={<UpdatePost />} />
            <Route path="admin/posts" element={<Posts />} />
            <Route path="admin/barcode" element={<BarCodeGen />} />
            <Route path="admin/reader" element={<Reader />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/createProduct" element={<CreateProduct />} />
            <Route path="admin/products/:id" element={<UpdateProduct />} />
            <Route path="admin/qr" element={<QRcodes />} />
            

          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;