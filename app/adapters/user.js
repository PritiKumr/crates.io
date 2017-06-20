import ApplicationAdapter from './application';
 
export default ApplicationAdapter.extend({
    favorite(id) {
        return this.ajax(this.urlForFavoriteAction(id), 'PUT');
    },

    unfavorite(id) {
        return this.ajax(this.urlForFavoriteAction(id), 'DELETE');
    },

    urlForFavoriteAction(id) {
        return `${this.buildURL('user', id)}/favorite`;
    },

    favoriteUsers(id) {
        return this.ajax(`${this.buildURL('user', id)}/favorite_users`, 'GET');
    },
});