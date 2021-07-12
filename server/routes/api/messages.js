const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const userSockets = require("../../userSockets");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // find a conversation based on sender and recipient, in case it already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (userSockets.includes(sender.id)) {
        sender.online = true;
      }
    }

    // error on invalid target conversationId when provided
    if (conversationId && conversation.id !== conversationId) {
      return res.sendStatus(400);
    }

    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.patch("/read", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, conversationId } = req.body;

    // find a conversation based on sender and recipient, in case it already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    // error on invalid target conversationId when provided
    if (conversationId && conversation.id !== conversationId) {
      return res.sendStatus(400);
    }

    await Message.update(
      { read: true },
      {
        where: {
          read: false,
          conversationId: conversationId,
          senderId: recipientId,
        },
      }
    );

    res.json({ conversationId: conversationId });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
