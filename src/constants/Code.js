//0:正常，1:权限出错，2:参数验证出错，3:业务验证出错，4:异常出错(未知错误)，5:接口不存在
const Code = {
	INIT:-1,
	NORMAL:0,
	UNAUTHORIZED:1,
	ARGUMENTERROR:2,
	ERROR:3,
	UNKOWNERROR:4,
	NOTFOUND:5
}

export default Code