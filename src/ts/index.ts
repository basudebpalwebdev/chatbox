document.addEventListener('DOMContentLoaded', () => {
    let isMinimized: boolean = false;
    /**
     * Gets the stored cookie value for chat window state
     */
    const cookieValue: string | null = getCookie('isMinimized');
    const chatBox = document.getElementById('basu-chat-box');
    const chatBoxAction = chatBox!.querySelector('.basu-chatbox-action');
    /**
     * Defining svg for minimize and maximize buttons
     */
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
    /**
     * Setting the boolean check from cookie data
     */
    isMinimized = cookieValue === null ? false : cookieValue.toLowerCase() === 'true' ? true : false;
    /**
     * Sets the chat window position according to the cookie value
     */
    if (isMinimized) {
        chatBoxAction!.innerHTML = chevronUpSvg;
        chatBox!.classList.replace('basu-maximize', 'basu-minimize');
    } else {
        chatBoxAction!.innerHTML = chevronDownSvg;
        chatBox!.classList.replace('basu-minimize', 'basu-maximize');
    }
    /**
     * Clicking on the minimize or maximize buttons would toggle the value of @var isMinimized,
     * change state of the chat window and save the state in cookie
     */
    chatBoxAction!.addEventListener('click', () => {
        try {
            if (isMinimized) {
                isMinimized = false;
                chatBoxAction!.innerHTML = chevronDownSvg;
                chatBox!.classList.replace('basu-minimize', 'basu-maximize');
                document.cookie = 'isMinimized=false;';
            } else {
                isMinimized = true;
                chatBoxAction!.innerHTML = chevronUpSvg;
                chatBox!.classList.replace('basu-maximize', 'basu-minimize');
                document.cookie = 'isMinimized=true;';
            }
        } catch (error) {
            console.error(error);
        }
    });
    /**
     * Shows the chat window 5 seconds after the page has been loaded
     */
    setTimeout(() => {
        isMinimized ? chatBox!.classList.add('basu-minimize') : chatBox!.classList.add('basu-maximize');
        chatBox!.classList.remove('basu-hidden');
    }, 5000);
});
/**
 * This function processes the cookie string to find the value of the key supplied in the argument @param key .
 * The function returns the value or 'null' in case it fails to find the cookie.
 */
function getCookie(key: string): string | null {
    try {
        return document.cookie.split(';').reduce((value: string | null, currentCookie: string) => {
            var arr = currentCookie.split('=');
            return (arr[0].trim() === key) ? arr[1] : value;
        }, null);
    } catch (error) {
        console.error(error);
        return null;
    }
}