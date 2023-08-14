import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import { Routes, Route } from 'react-router-dom';
import Posts from './components/Posts';
import CreatePost from './components/CreatePost';
import UpdatePost from './components/UpdatePost';
import BarCodeGen from './components/BarCodeGen';
import Reader from './components/Reader';
import CreateProduct from './components/CreateProduct';
import UpdateProduct from './components/UpdateProduct';
import Products from './components/Products';
import QRcodes from './components/QRcodes';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import AllProducts from './pages/AllProducts';
import Mujer from './pages/Mujer';

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
        <Route path="registro" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<AllProducts />} />
        <Route path="/productos/mujer" element={<Mujer />} />

        

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/productos/:id" element={<ProductDetail />} />
            
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