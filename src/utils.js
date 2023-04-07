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

export const openOptionsMenu = (event, menuType, menuId) => {
    event.preventDefault();

    const optionsMenuEl = document.querySelector(`#menu-${menuType}-${menuId}`);
    optionsMenuEl.classList.add('menu-active');

    const xPosition = event.clientX;
    const yPosition = event.clientY;

    optionsMenuEl.style.left = `${xPosition}px`;
    optionsMenuEl.style.top = `${yPosition}px`;
};

export const closeOptionsMenu = () => {
    const optionsMenuEl = document.querySelector('.menu-active');

    if (optionsMenuEl) {
        optionsMenuEl.classList.remove('menu-active');
    }
};