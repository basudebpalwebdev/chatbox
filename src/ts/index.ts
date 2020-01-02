document.addEventListener('DOMContentLoaded', () => {
    let isMinimized: boolean = false;
    const cookieValue: string | null = getCookie('isMinimized');
    const chatBox = document.getElementById('chatBox');
    const chatBoxAction = chatBox!.querySelector('.chatbox-action');
    const chevronDownSvg: string = `
        <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512">
            <path fill="currentColor"
                d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z">
            </path>
        </svg>
    `;
    const chevronUpSvg: string = `
        <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 448 512">
            <path fill="currentColor" 
                d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z">
            </path>
        </svg>
    `;

    isMinimized = cookieValue === null ? false : cookieValue.toLowerCase() === 'true' ? true : false;

    if (isMinimized) {
        chatBoxAction!.innerHTML = chevronUpSvg;
        chatBox!.classList.replace('maximize', 'minimize');
    } else {
        chatBoxAction!.innerHTML = chevronDownSvg;
        chatBox!.classList.replace('minimize', 'maximize');
    }

    setTimeout(() => {
        chatBox!.classList.remove('hidden');
        isMinimized ? chatBox!.classList.add('minimize') : chatBox!.classList.add('maximize');
    }, 5000);

    chatBoxAction!.addEventListener('click', () => {
        if (isMinimized) {
            isMinimized = false;
            chatBoxAction!.innerHTML = chevronDownSvg;
            chatBox!.classList.replace('minimize', 'maximize');
            document.cookie = 'isMinimized=false;';
        } else {
            isMinimized = true;
            chatBoxAction!.innerHTML = chevronUpSvg;
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