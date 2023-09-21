export const excludeSeconds = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
};
export const intervalToString = (i) => `${(i.hours ?? 0).toString().padStart(2, "0")}:${(i.minutes ?? 0).toString().padStart(2, "0")}`;
