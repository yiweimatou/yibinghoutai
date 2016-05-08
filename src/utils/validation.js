export function isEmail(value){
	if(!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)){
		return false
	}else {
		return true
	}
}

export function isEmpty(value){
	return value === undefined || value === null || value === ''
}

export function minLength(min) 
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return false
    }else{
    	return true
    }
  }
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return false
    }else{
    	return true
    }
  }
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return false
  }else{
  	return true
  }
}