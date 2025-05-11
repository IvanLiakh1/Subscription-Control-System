import moment from 'moment';
moment.locale('uk');
export const groupSpendingsByCategory = (spendings, mode, selectedCategory) => {
    if (spendings.length === 0) return [];

    const filteredSpendings = selectedCategory
        ? spendings.filter((item) => item.subscriptionId?.category === selectedCategory)
        : spendings;

    const categories = selectedCategory
        ? [selectedCategory]
        : [...new Set(spendings.map((item) => item.subscriptionId?.category).filter(Boolean))];

    const dates = filteredSpendings.map((s) => moment(s.date));
    if (dates.length === 0) return [];

    const minDate = moment.min(dates);
    const maxDate = moment.max(dates);
    const current = minDate.clone();

    const grouped = {};
    while (current.isSameOrBefore(maxDate, mode === 'weekly' ? 'week' : mode === 'monthly' ? 'month' : 'year')) {
        let key;
        switch (mode) {
            case 'weekly':
                key = `${current.isoWeek()}-${current.year()}`;
                break;
            case 'monthly':
                key = current.format('YYYY-MM');
                break;
            case 'yearly':
                key = current.format('YYYY');
                break;
            default:
                key = current.format('YYYY-MM');
        }

        if (!grouped[key]) {
            grouped[key] = { name: key };
            categories.forEach((category) => {
                grouped[key][category] = 0;
            });
        }

        if (mode === 'weekly') current.add(1, 'week');
        else if (mode === 'monthly') current.add(1, 'month');
        else if (mode === 'yearly') current.add(1, 'year');
    }

    filteredSpendings.forEach((item) => {
        const date = moment(item.date);
        let key;
        switch (mode) {
            case 'weekly':
                key = `${date.isoWeek()}-${date.year()}`;
                break;
            case 'monthly':
                key = date.format('YYYY-MM');
                break;
            case 'yearly':
                key = date.format('YYYY');
                break;
            default:
                key = date.format('YYYY-MM');
        }

        const category = item.subscriptionId?.category || 'Інше';
        if (grouped[key]) {
            grouped[key][category] = (grouped[key][category] || 0) + item.subscriptionId.price;
        }
    });
    const result = Object.values(grouped).map((item) => {
        let label;
        const key = item.name;

        switch (mode) {
            case 'weekly': {
                const [week, year] = key.split('-');
                const startOfWeek = moment().year(year).isoWeek(week).startOf('isoWeek');
                const endOfWeek = moment(startOfWeek).endOf('isoWeek');
                label = `${startOfWeek.format('DD MMM')} – ${endOfWeek.format('DD MMM YYYY')}`;
                break;
            }
            case 'monthly':
                label = moment(key, 'YYYY-MM').format('MMM YYYY');
                break;
            case 'yearly':
                label = key;
                break;
            default:
                label = key;
        }

        return {
            ...item,
            name: label,
        };
    });

    return result;
};
