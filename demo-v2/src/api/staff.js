import http from '../untils/http'

function getUsers(data) {
    return http({
        method: 'get',
        url: 'sys/user',
        data: {}
    })
}

export {
    getUsers
}