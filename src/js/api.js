import { postMethod } from './api-methods'

export const getStyle = () => {
  return postMethod('/style/1')
}

export const getData = () => {
  return postMethod('/select/1')
}
