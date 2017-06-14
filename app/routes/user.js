import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
    queryParams: {
        page: { refreshModel: true },
        sort: { refreshModel: true },
    },
    data: {},

    setupController(controller, model) {
        this._super(controller, model);

        controller.set('fetchingFeed', true);
        controller.set('crates', this.get('data.crates'));
        controller.set('user', model.user);
        controller.set(
            'allowFavorting', 
            this.session.get('currentUser') != model.user
        );
        
        if (controller.get('allowFavorting')) {
            ajax(`/api/v1/users/${model.user.id}/favorited`)
                .then((d) => controller.set('favorited', d.favorited))
                .finally(() => controller.set('fetchingFavorite', false));
        }
    },

    model(params) {
        const { user_id } = params;
        return this.store.find('user', user_id).then(
            (user) => {
                params.user_id = user.get('id');
                return Ember.RSVP.hash({
                    crates: this.store.query('crate', params),
                    user
                });
            },
            (e) => {
                if (e.errors.any(e => e.detail === 'Not Found')) {
                    this
                        .controllerFor('application')
                        .set('nextFlashError', `User '${params.user_id}' does not exist`);
                    return this.replaceWith('index');
                }
            }
        );
    }

});
