export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'
export const ADD_ERROR_MESSAGE = 'ADD_ERROR_MESSAGE'
  // Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}

export function addErrorMessage(message) {
  return {
    type: ADD_ERROR_MESSAGE,
    message
  }
}