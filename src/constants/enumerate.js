//0:正常，1:权限出错，2:参数验证出错，3:业务验证出错，4:异常出错(未知错误)，5:接口不存在
export const CODE = {
	INIT:-1,
	NORMAL:200,
	BAD_REQUEST:400,
	UNAUTHORIZED:401,
	FORBIDDEN:403,
	INTERNAL_SERVER_ERROR:500
}

//1:正常,2:冻结,3:永久冻结
export const ORGANIZE_STATE = {
	NORMAL:1,
	FREEZE:2,
	FOREVER_FREEZE:3
}

const INIT_MSG = 'unkown error'
export const EMPTY = 'arguments is empty'

export const RESULT = {
	code : CODE.INIT,
	msg : INIT_MSG
}
export const EXPECT_RESULT = {
	code : CODE.NORMAL,
	msg : ''
}

export const LIMIT = 9