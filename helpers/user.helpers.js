module.exports = (hbs) => {
    hbs.registerHelper('get_user_status', (user) => {
        if (user.active) {
            return 'primary';
        } else {
            return 'danger';
        }
    });
}