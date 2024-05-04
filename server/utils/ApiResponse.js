class ApiResponse {
    constructor(res, status, msg, data = null) {
        const responseObject = {
            msg: msg,
        };
        if (data) {
            responseObject.data = data;
        }

        res.status(status).json(responseObject);
    }
}

module.exports = ApiResponse;