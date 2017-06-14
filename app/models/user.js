import DS from 'ember-data';

export default DS.Model.extend({
    email: DS.attr('string'),
    name: DS.attr('string'),
    login: DS.attr('string'),
    api_token: DS.attr('string'),
    avatar: DS.attr('string'),
    url: DS.attr('string'),

    favorite() {
        return this.store.adapterFor('user').favorite(this.get('id'));
    },

    unfavorite() {
        return this.store.adapterFor('user').unfavorite(this.get('id'));
    },

    favorite_users() {
        return this.store.adapterFor('user').favorite_users(this.get('id'));
    },

});
