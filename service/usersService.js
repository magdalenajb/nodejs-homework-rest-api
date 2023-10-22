const User = require('./schemas/userSchema');

const listUsers = async () => {
    return User.find();
};

const userSignUp = async ({ email, password, subscription, token }) => {
    return User.create({ email, password, subscription, token });
};

const userLogIn = async ({ email }) => {
    return User.findOne({ email });
};

const userLogOut = async (id) => {
    return User.findOne({ _id: id });
};

const updateStatusUser = async (id, body) => {
    return User.findByIdAndUpdate({ _id: id }, body, { new: true });
};

const updateSubscriptionUser = async (id, subscription) => {
    return User.findByIdAndUpdate(
        { _id: id },
        { subscription },
        { new: true }
    );
};

const updateAvatarUser = async(id, avatarURL) => {
    return User.findByIdAndUpdate(
        { _id: id },
        { avatarURL },
        { new: true }
    );
};

const findByVerificationToken = async (verificationToken) => {
    return User.findOne({ verificationToken });
};

const findByEmail = async (email) => {
    return User.findOne({ email });
};

module.exports = {
    listUsers,
    userSignUp,
    userLogIn,
    userLogOut,
    updateStatusUser,
    updateSubscriptionUser,
    updateAvatarUser,
    findByVerificationToken,
    findByEmail,
};