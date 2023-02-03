import {Outlet, useNavigate} from "react-router-dom";
import { AdminHeaders, PrimaryButton } from "./CommonStyled";

const ProductsDashboard = () => {

    const navigate = useNavigate()

    return (
        <>
    <AdminHeaders>
        Produtos
        <PrimaryButton onClick = {() => navigate("/admin/productsdash/create-product")}>
            Criar um produto
        </PrimaryButton>
    </AdminHeaders>
    <Outlet/>
    </>
    
    
    
    )

};
  
  export default ProductsDashboard;