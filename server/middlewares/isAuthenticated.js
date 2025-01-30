import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token; // we get the token from the cookies

        if (!token) {
            return res.status(401).json({ message: "user Not authenticated", success: false });
        } // we check the user is authenticated or not, if not we send a response with 401 status code and message

        const decode = jwt.verify(token, process.env.JWT_SECRET);  // we verify the token with the secret key and get the decoded token

        if (!decode) {
            return res.status(401).json({ message: "Invalid token", success: false });
        } // if the token is invalid we send a response with 401 status code and message

        req.id = decode.userId; // we store the userId in the request object
        next(); // we call the next  function after user is verified and execute the next function

    } catch (error) {
        console.log(error);

    }
}

export default isAuthenticated;