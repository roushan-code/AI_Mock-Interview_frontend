export const validateEmail = (email) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
}
export const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
}

export const getInitials = (title) => {
    if (!title) return "";
    const words = title.split(" ");
    let initials = "";
    for (let i = 0; i < Math.min(words.length,2); i++) {
            initials += words[i][0];
    }
    return initials.toUpperCase();
}