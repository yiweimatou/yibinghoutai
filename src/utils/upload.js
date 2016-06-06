// import fetch from 'isomorphic-fetch'

// export function uploadFile(formData) {
//     if (formData.has('uploadfile')) {
//         return Object.assign({}, RESULT, {
//             msg: '必须包含文件'
//         })
//     }
//     return fetch(`${config.upload}/file`, {
//         method: 'POST',
//         body: formData
//     }).catch(error => {
//         return Object.assign({}, RESULT, {
//             msg: error.message
//         })
//     }).then(response => {
//         return response.ok ?
//             response.json() : Promise.reject(Object.assign({}, RESULT, {
//                 msg: response.statusText
//             }))
//     }).catch(error => {
//         return error
//     }).then(data => {
//         return data.code === 0 ?
//             Object.assign({}, RESULT, {
//                 code:CODE.NORMAL,
//                 data: {
//                     fileName: data.file_name,
//                     fileUrl: data.file_path
//                 }
//             }) : Object.assign({}, RESULT, {
//                 msg: data.msg
//             })
//     })
// }

// export function uploadCover(formData) {
//     if (!formData.has('uploadfile')) {
//         return Promise.resolve(Object.assign({}, RESULT, {
//             msg: '必须包含文件'
//         }))
//     }
//     return fetch(`${config.upload}/cover`, {
//         method: 'POST',
//         body: formData
//     }).catch(error => {
//         return Object.assign({}, RESULT, {
//             msg: error.message
//         })
//     }).then(response => {
//         return response.ok ?
//             response.json() : Promise.reject(Object.assign({}, RESULT, {
//                 msg: response.statusText
//             }))
//     }).catch(error => {
//         return error
//     }).then(data => {
//         return data.code === 0 ?
//             Object.assign({}, RESULT, {
//                 code:CODE.NORMAL,
//                 data: {
//                     url: `${config.domain}cover/${data.cover_path}256_256.png`
//                 }
//             }) : Object.assign({}, RESULT, {
//                 msg: data.msg
//             })
//     })
// }
// export function uploadPPT() {
//     if (formData.has('uploadfile')) {
//         return Object.assign({}, RESULT, {
//             msg: '必须包含文件'
//         })
//     }
//     return fetch(`${config.upload}/ppt`, {
//         method: 'POST',
//         body: formData
//     }).catch(error => {
//         return Object.assign({}, RESULT, {
//             msg: error.message
//         })
//     }).then(response => {
//         return response.ok ?
//             response.json() : Promise.reject(Object.assign({}, RESULT, {
//                 msg: response.statusText
//             }))
//     }).catch(error => {
//         return error
//     }).then(data => {
//         return data.code === 0 ?
//             Object.assign({}, RESULT, {
//                 code:CODE.NORMAL,
//                 data: {
//                     cover: `${config.domain}cover/${data.cover_path}256_256.png`,
//                     url: `${config.domain}${data.file_path}`
//                 }
//             }) : Object.assign({}, RESULT, {
//                 msg: data.msg
//             })
//     })
// }

// export function uploadYunbook() {
//     if (formData.has('uploadfile')) {
//         return Object.assign({}, RESULT, {
//             msg: '必须包含文件'
//         })
//     }
//     return fetch(`${config.upload}/yunbook`, {
//         method: 'POST',
//         body: formData
//     }).catch(error => {
//         return Object.assign({}, RESULT, {
//             msg: error.message
//         })
//     }).then(response => {
//         return response.ok ?
//             response.json() : Promise.reject(Object.assign({}, RESULT, {
//                 msg: response.statusText
//             }))
//     }).catch(error => {
//         return error
//     }).then(data => {
//         return data.code === 0 ?
//             Object.assign({}, RESULT, {
//                 code:CODE.NORMAL,
//                 data: {
//                     cover: `${config.domain}cover/${data.cover_path}256_256.png`,
//                     url: `${config.domain}${data.file_path}`
//                 }
//             }) : Object.assign({}, RESULT, {
//                 msg: data.msg
//             })
//     })
// }