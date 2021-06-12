import { MessageType } from '../common/enums/enums.global'

export const setResponse = (_data, _messages, _error, messageType) => {
    if (_error && _error.message) {
        return {
            data: false,
            messages: [{ 
                message: _error.message,
                messageType: messageType !== undefined ? messageType : MessageType.error
            }]
        }
    } else {
        if (_messages) {
            let __messages = [];
            for (let i = 0, messagesLength = _messages.length; i < messagesLength; i++) {
                __messages.push({
                    messageType: _data === true ? MessageType.success : MessageType.warning,
                    message: _messages[i]
                })
            }

            return {
                data: _data,
                messages: __messages
            }
        } else {
            return {
                data: _data,
                messages: []
            }
        }
    }
}