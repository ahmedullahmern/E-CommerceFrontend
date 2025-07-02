const devUrl = "http://localhost:5000/"
const proudUrl = "https://e-commerce-frontend-pi-taupe.vercel.app/"

export const Base_Url = devUrl

export const AppRoutes = {
    signup: Base_Url + "auth/register",
    login: Base_Url + "auth/login",
    getMyInfo: Base_Url + "users/myInfo",
    updateProfile: Base_Url + "auth/profile/update",
    forgetPassword: Base_Url + "auth/forgot-password",
    resetPassword: Base_Url + "auth/reset-password/:token",
    AddProduct: Base_Url + "/api/product/addproduct",
    allproducts: Base_Url + "api/product/allproducts",
    SingleProduct: Base_Url + "/api/product/product/:id",
    AddProductReviews: Base_Url + "/api/product/product/:id/review",
    OrdePlace: Base_Url + "/api/order/place",
    OrdeCansel: Base_Url + "/api/order/cancel/:id",
    getAllOrderAdmin: Base_Url + "/api/admin/all",
    UpdatedProductAdmin: Base_Url + "/api/admin/product/:id",
    DeleteProductAdmin: Base_Url + "/api/admin/product/:id",
    UpdatedOrderStatusAdmin: Base_Url + "/api/admin/status/:id",
    UpdatedOrderPaymentStatusAdmin: Base_Url + "/api/admin/update-payment/:id",

}