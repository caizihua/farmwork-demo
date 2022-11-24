import to from 'await-to-js'
import axios from 'axios'

const urlPrefix = (params) => {
  return '/pct' + params
}

const methods = ({ url, method, params }) => {
  return to(
    new Promise((resolve, reject) => {
      axios[method](urlPrefix(url), params).then(res => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  )
}

const getMethod = (url, params) => methods({ url, method: 'get', params })
const postMethod = (url, params) => methods({ url, method: 'post', params })
const deleteMethod = (url, params) => methods({ url, method: 'delete', params })

export { getMethod, postMethod, deleteMethod }
