export default function timeSince(date) {
  const getUnit = (number, baseUnit) => {
    // return number <= 1 ? `${number} ${baseUnit} ago` : `${number} ${baseUnit}s ago`;
    return `${number} ${baseUnit}${number <= 1 ? '' : 's'} ago`;
  };

  let seconds = Math.floor((new Date() - new Date(date)) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return getUnit(Math.floor(interval), 'year');
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return getUnit(Math.floor(interval), 'month');
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return getUnit(Math.floor(interval), 'day');
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return getUnit(Math.floor(interval), 'hour');
  }
  interval = seconds / 60;
  if (interval > 1) {
    return getUnit(Math.floor(interval), 'minute');
  }
  return 'seconds ago';
}
