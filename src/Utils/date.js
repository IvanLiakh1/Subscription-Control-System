export const getTimeUntilNextPayment = (nextDate, billingCycle) => {
    const now = new Date();
    const next = new Date(nextDate);
  
    const diffMs = next - now;
    if (diffMs <= 0) return 'сьогодні';
  
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    
    switch (billingCycle) {
      case 'daily':
        return diffDays === 1 ? 'завтра' : `через ${diffDays} дн${getDaySuffix(diffDays)}`;
  
      case 'weekly': {
        const weeks = Math.floor(diffDays / 7);
        const days = diffDays % 7;
        if (weeks === 0) return `через ${diffDays} дн${getDaySuffix(diffDays)}`;
        return days === 0
          ? `через ${weeks} тиж${getWeekSuffix(weeks)}`
          : `через ${weeks} тиж${getWeekSuffix(weeks)} і ${days} дн${getDaySuffix(days)}`;
      }
  
      case 'monthly': {
        const months = next.getMonth() - now.getMonth() + (12 * (next.getFullYear() - now.getFullYear()));
        if (months <= 0) return `через ${diffDays} дн${getDaySuffix(diffDays)}`;
        return `через ${months} міс${getMonthSuffix(months)}`;
      }
  
      case 'yearly': {
        const years = next.getFullYear() - now.getFullYear();
        return years === 1 ? 'через рік' : `через ${years} роки(ів)`;
      }
  
      default:
        return `через ${diffDays} дн${getDaySuffix(diffDays)}`;
    }
  };
  const getDaySuffix = (n) => (n === 1 ? 'ь' : (n >= 2 && n <= 4 ? 'і' : 'ів'));
  const getWeekSuffix = (n) => (n === 1 ? 'день' : (n >= 2 && n <= 4 ? 'ні' : 'нів'));
  const getMonthSuffix = (n) => (n === 1 ? 'яць' : (n >= 2 && n <= 4 ? 'яці' : 'яців'));
  