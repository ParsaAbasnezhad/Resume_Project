const Chat = require("../models/Chat");

const chatController = (req, res) => {
    res.render('chat');
};

const postChatController = async (req, res) => {
    try {
        const { name, number, message } = req.body;


        if (!number || !message) {
            req.flash('error', 'message is required');
            return res.redirect('/');
        }


        const newChat = new Chat({
            name: name?.trim() || "somebody",
            number: number.trim(),
            message: message.trim(),
            timestamp: new Date()
        });

        await newChat.save();
        res.redirect('/');

    } catch (err) {
        console.error("error:", err);
        req.flash('error', errorMessage);
        res.redirect('/'); // my home
    }
};

module.exports = { postChatController, chatController };