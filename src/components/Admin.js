import { Link } from "react-router-dom";
import Users from './Users';
import AdminNav from "./AdminNav";
import Products from "./Products";

const Admin = () => {
    return (
        <main className="dashboard admin-container">
            <AdminNav />
            
                
                <Products />
                {/* <br />
                <div className="flexGrow">
                    <Link to="/">Home</Link>
                </div> */}
            
        </main>
    )
}

export default Admin
