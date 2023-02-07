import http from '../untils/http'

function login(data) {
    return http({
        method: 'post',
        url: 'sys/login',
        data: data
    })
}

export {
    login
}