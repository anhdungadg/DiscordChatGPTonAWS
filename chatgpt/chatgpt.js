import { ChatGPTAPI } from 'chatgpt'

const chatGPT = {
    init: false,
    sendMessage: null,
}

export async function initChatGPT() {
    const api = new ChatGPTAPI({
        apiKey: process.env.OPENAI_API_KEY
    })

    chatGPT.sendMessage = (message, opts = {}) => {
        return api.sendMessage(message, opts)
    }

    chatGPT.init = true
}

export async function askQuestion(question, cb, opts = {}) {

    if (!chatGPT.init) {
        cb("Chatgpt chưa sẵn sàng! Có khi đang bị hỏi nhiều quá xỉu rồi!")
        return;
    }

    const { conversationInfo } = opts

    let tmr = setTimeout(() => {
        cb("Ui cha, Có cha nội nào nhậu sỉn đái vô server rồi! (Timeout)")
    }, 120000)

    if (process.env.CONVERSATION_START_PROMPT.toLowerCase() != "false" && conversationInfo.newConversation) {
        try {
            const response = await chatGPT.sendMessage(process.env.CONVERSATION_START_PROMPT, {
                conversationId: conversationInfo.conversationId,
                parentMessageId: conversationInfo.parentMessageId
            })
            conversationInfo.conversationId = response.conversationId
            conversationInfo.parentMessageId = response.id
            clearTimeout(tmr)
            tmr = setTimeout(() => {
                cb("Ui cha, Có cha nội nào nhậu sỉn đái vô server rồi! (Timeout)")
            }, 120000)
        } catch (e) {
            clearTimeout(tmr)
            cb("Ui cha, Có cha nội nào nhậu sỉn đái vô server rồi! (Error)")
            return;
        }
    }

    try {
        const response = await chatGPT.sendMessage(question, {
            conversationId: conversationInfo.conversationId,
            parentMessageId: conversationInfo.parentMessageId
        })
        conversationInfo.conversationId = response.conversationId
        conversationInfo.parentMessageId = response.id
        cb("(App này hân hạnh được host trên server Core2 Duo đã hơn 17 năm tuổi!)\n\n" + response.text)
    } catch (e) {
        cb("Ui cha, Có cha nội nào nhậu sỉn đái vô server rồi! (Error)")
        console.error("dm error : " + e)
    } finally {
        clearTimeout(tmr)
    }
}