const userService = require("../service/usersService");
const sendEmail = require("../middlewares/mailer");

const verifyEmail = async (req, res, next) => {
    try {
        const { verificationToken } = req.params;
        const user = await userService.findByVerificationToken(verificationToken);
        if (!user) {
            return res.status(404).json({
                status: "Error",
                message: "User not found",
            });
        }

        user.verify = true;
        user.verificationToken = null;
        await user.save();
        return res.status(200).json({
            status: "OK",
            message: "Verification successful",
        });

    } catch (error) {
        next(error); 
    }
};

const resendVerification = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                status: "Error",
                message: "Missing required field: email",
                data: "Bad Request",
            });
        }

        const user = await userService.findByEmail(email); 
        if (!user) {
            return res.status(404).json({
                status: "Error",
                message: "User not found",
            });
        }

        if (user.verify) {
            return res.status(400).json({
                status: "Error",
                message: "Verification already completed",
                data: "Bad Request",
            });
        }

        const verificationLink = `${req.protocol}://${req.get(
            "host"
        )}/api/users/verify/${user.verificationToken}`;
        sendEmail({
            to: email,
            link: verificationLink,
        });

        return res.status(200).json({
            status: "OK",
            message: "Verification email resent",
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    verifyEmail,
    resendVerification,
};
