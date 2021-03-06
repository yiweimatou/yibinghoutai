export const HOST = 'http://121.41.92.56'

export const  ADMIN_API_DOMAIN = `${HOST}:90`
export const USER_API_DOMAIN = `${HOST}:91`
export const UPLOAD_DOMAIN = `${HOST}:99`

/**
 * api codes
 */
export const OK = 200
export const BAD_REQUEST = 400
export const UNAUTHORIZED = 401
export const FORBIDDEN = 403
export const INTERNAL_SERVER_ERROR = 500
/**
 * admin apis
 */
export const ADMIN_LOGIN_API = `${ADMIN_API_DOMAIN}/admin/login`
export const ADMIN_VALID_API = `${ADMIN_API_DOMAIN}/admin/valid`
export const ADMIN_EDIT_API = `${ADMIN_API_DOMAIN}/admin/put`
export const ADMIN_LOGOUT_API = `${ADMIN_API_DOMAIN}/admin/logout`
/**
 * organize apis
 */
export const ORGANIZE_GET_API = `${ADMIN_API_DOMAIN}/organize/get`
export const ORGANIZE_LIST_API = `${ADMIN_API_DOMAIN}/organize/list`
export const ORGANIZE_EDIT_API = `${ADMIN_API_DOMAIN}/organize/put`
export const ORGANIZE_INFO_API = `${ADMIN_API_DOMAIN}/organize/info`
export const ORGANIZE_ADD_API = `${ADMIN_API_DOMAIN}/organize/add`
export const ORGANIZE_DEL_API = `${ADMIN_API_DOMAIN}/organize/del`
/**
 * user apis
 */
export const USER_INFO_API = `${ADMIN_API_DOMAIN}/user/info`
export const USER_GET_API = `${ADMIN_API_DOMAIN}/user/get`
export const USER_ADD_API = `${ADMIN_API_DOMAIN}/user/add`
export const USER_LIST_API = `${ADMIN_API_DOMAIN}/user/list`
export const USER_EDIT_API = `${ADMIN_API_DOMAIN}/user/put`
/**
 * region apis
 */
export const REGION_INFO_API = `${ADMIN_API_DOMAIN}/region/info`
export const REGION_GET_API = `${ADMIN_API_DOMAIN}/region/get`
export const REGION_LIST_API = `${ADMIN_API_DOMAIN}/region/list`
/**
 * area apis
 */
export const AREA_GET_API = `${ADMIN_API_DOMAIN}/area/get`
export const AREA_LIST_API = `${ADMIN_API_DOMAIN}/area/list`
export const AREA_INFO_API = `${ADMIN_API_DOMAIN}/area/info`
/**
 * upload apis
 */
export const UPLOAD_LOGO_API = `${UPLOAD_DOMAIN}/logo`
export const UPLOAD_COVER_API = `${UPLOAD_DOMAIN}/cover`
export const UPLOAD_AVATAR_API = `${UPLOAD_DOMAIN}/face`