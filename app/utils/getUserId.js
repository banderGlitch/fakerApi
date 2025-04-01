export const getUserId = () => {

    // it will check for the userId related to key  --- and retrive the userId ex:-054233310112
    const key = 'userId'; 

    if (typeof window === 'undefined') return '';  // SSR CHECKS SERVER SIDE RENDERING

    let storedId = localStorage.getItem(key);

    if (!storedId) {
        storedId = crypto.randomUUID();
        localStorage.setItem(key,storedId)
    }

    return storedId;
}

// userId : 12122131313123123 ------> is returned every time 