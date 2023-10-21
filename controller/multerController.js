const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");
const userService = require("../service/usersService");

const avatarsDir = path.join(__dirname, '..', 'public', 'avatars')

const resizeAvatar = async (fileName, avatarName) => {
    const image = await Jimp.read(fileName);
    if (!image) {
        throw new Error('Cannot read the file!');
    }
    await image.resize(250, 250).quality(100).writeAsync(avatarsDir + '/' + avatarName);
};

const uploadAvatar = async(req, res, next) => {
    const { path: tempUpload, originalname } = req.file;
    const { _id } = req.user;
    const imageName = `${_id}_${originalname}`;

    try {
        const resultUpload = path.join(avatarsDir, imageName);
        await fs.rename(tempUpload, resultUpload);

        const avatarURL = path.join('public', 'avatars', imageName);

        await resizeAvatar(resultUpload, imageName);

        const updatedUser = await userService.updateAvatarUser(_id, { avatarURL });

        res.status(200).json({
            data: {
                message: 'File uploaded successfully',
                avatarURL: updatedUser.avatarURL,
            },
        });

    } catch (error) {
        await fs.unlink(tempUpload)
        next(error);
    }
};

module.exports = uploadAvatar;
