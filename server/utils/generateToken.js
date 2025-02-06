import jwt from 'jsonwebtoken';

export const generateToken = async  (res, user, message) => {
    const token = await jwt.sign({ userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' });
    return res.status(200).cookie('token', token, { httpOnly: true, sameSite: 'strict',secure:true, maxAge: 24 * 60 * 60 * 1000 }).json({
        success: true,
        message,
        user
    })
}