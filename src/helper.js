export const getNameInitials = (name) => {
    const nameArr = name.split(' ');
    let initials = nameArr[0].substring(0, 1).toUpperCase();
    if (nameArr.length > 1) {
        initials += nameArr[nameArr.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
}