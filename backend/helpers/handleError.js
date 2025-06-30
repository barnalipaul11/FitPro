export const handleError = (res, statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;

    res.status(statusCode).json({
        success: false,
        message: message,
        error
    });
};