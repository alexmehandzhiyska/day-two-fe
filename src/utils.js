export const getDay = (date) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const currentDate = new Date(date);
    const dayIndex = currentDate.getDay();

    return days[dayIndex].toUpperCase();
};

export const getDayNum = (date) => {
    const currentDate = new Date(date);
    return currentDate.getDate();
};

export const getFullDate = (date) => {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const day = currentDate.getDate();

    return `${day} ${month}, ${year}`;
};