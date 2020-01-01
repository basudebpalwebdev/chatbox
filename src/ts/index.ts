document.addEventListener('DOMContentLoaded', () => {
    let isMinimized: boolean = false;
    const cookieValue: string | null = getCookie('isMinimized');
    const chatBox = document.getElementById('chatBox');
    const chatBoxAction = chatBox!.querySelector('.chatbox-action');

    isMinimized = cookieValue === null ? false : cookieValue.toLowerCase() === 'true' ? true : false;

    if (isMinimized) {
        chatBoxAction!.innerHTML = '^';
        chatBox!.classList.replace('maximize', 'minimize');
    } else {
        chatBoxAction!.innerHTML = '-';
        chatBox!.classList.replace('minimize', 'maximize');
    }

    setTimeout(() => chatBox!.classList.replace('hide', 'show'), 5000);

    chatBoxAction!.addEventListener('click', () => {
        if (isMinimized) {
            isMinimized = false;
            chatBoxAction!.innerHTML = '-';
            chatBox!.classList.replace('minimize', 'maximize');
            document.cookie = 'isMinimized=false;';
        } else {
            isMinimized = true;
            chatBoxAction!.innerHTML = '^';
            chatBox!.classList.replace('maximize', 'minimize');
            document.cookie = 'isMinimized=true;';
        }

    });
});

function getCookie(key: string): string | null {
    return document.cookie.split(';').reduce((value: string | null, currentCookie: string) => {
        var arr = currentCookie.split('=');
        return (arr[0].trim() === key) ? arr[1] : value;
    }, null);
}