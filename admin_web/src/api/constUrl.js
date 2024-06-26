const  userInfo = "/User"
const  menuInfo ="/Menu"
const roleInfo = "/Role"
const avatarInfo = "/File/Download/"
const baseURL =  "https://localhost:7055/api"
const upload = "https://localhost:7055/api/File/UploadAvantar/"
const DOWNLOAD= "https://localhost:7055/api/File/Download/"
const HANDLE_ROLES_URL = "https://localhost:7055/api/User/HandleRoles/"
const ROLE_URL = "https://localhost:7055/api/Role"
const ROLE_ASSIGN_USER = "/AssignUsers"
const SET_STATUS = "/SetStatus"
const VIEW_MENUS = "/ViewMenus"
const Menus_URL ="/Menu"
const VIEW_ROLES_URL = "/ViewRoles"
const DEV_LOGIN = 'https://localhost:7265/auth/Account'
const PRO_LOGIN = 'http://20.70.176.171:7000/auth/Account'
const LOGIN_URL = process.env.NODE_ENV =="development" ? DEV_LOGIN:PRO_LOGIN
export default {
    userInfo, 
    menuInfo ,
    roleInfo, 
    avatarInfo, 
    baseURL ,
    upload, 
    DOWNLOAD, 
    HANDLE_ROLES_URL, 
    ROLE_URL,ROLE_ASSIGN_USER, 
    SET_STATUS,VIEW_MENUS, 
    LOGIN_URL,
    Menus_URL,
    VIEW_ROLES_URL
}