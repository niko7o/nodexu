module.exports = (hbs) => {
    hbs.registerHelper('get_user_status', (user) => {
        if (user.active) {
            return 'primary';
        } else {
            return 'danger';
        }
    });

    hbs.registerHelper('get_user_avatar', (user) => {
        if (user.avatar === 'https://rentnjoy.com/development/wp-content/uploads/1457/86/analyst-placeholder-avatar.png') {
            return user.avatar;
        } else {
            return 'images/uploads/' + user.avatar;
        }
    })
}