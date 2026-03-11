// Send updated users list to iOS
export function sendUsersToIOS(users) {
    try {
        if (
            window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers.userListUpdate
        ) {
            window.webkit.messageHandlers.userListUpdate.postMessage(users)
        } else {
            console.warn('iOS handler userListUpdate not found')
        }
    } catch (e) {
        console.error('sendUsersToIOS error', e)
    }
}

// Send updated posts list to iOS
export function sendPostsToIOS(posts) {
    try {
        if (
            window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers.postsUpdate
        ) {
            window.webkit.messageHandlers.postsUpdate.postMessage(posts)
        } else {
            console.warn('iOS handler postsUpdate not found')
        }
    } catch (e) {
        console.error('sendPostsToIOS error', e)
    }
}

// Send updated chats list to iOS
export function sendChatsToIOS(chats) {
    try {
        if (
            window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers.chatsUpdate
        ) {
            window.webkit.messageHandlers.chatsUpdate.postMessage(chats)
        } else {
            console.warn('iOS handler chatsUpdate not found')
        }
    } catch (e) {
        console.error('sendChatsToIOS error', e)
    }
}

// Send updated messages list to iOS
export function sendMessagesToIOS(messages) {
    try {
        if (
            window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers.messagesUpdate
        ) {
            window.webkit.messageHandlers.messagesUpdate.postMessage(messages)
        } else {
            console.warn('iOS handler messagesUpdate not found')
        }
    } catch (e) {
        console.error('sendMessagesToIOS error', e)
    }
}

// Send updated comments list to iOS
export function sendCommentsToIOS(comments) {
    try {
        if (
            window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers.commentsUpdate
        ) {
            window.webkit.messageHandlers.commentsUpdate.postMessage(comments)
        } else {
            console.warn('iOS handler commentsUpdate not found')
        }
    } catch (e) {
        console.error('sendCommentsToIOS error', e)
    }
}

// Handle page back or close action
export function goBackOrClose() {
    if (window.history.length > 1) {
        history.back()
    } else {
        // iOS WKWebView callback to close the page
        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.close) {
            window.webkit.messageHandlers.close.postMessage()
        } else {
            console.warn('WebKit close handler not found')
        }
    }
}