/**
 * Created by Stefan Abramiuk on 24.08.2017.
 */
({
    showSpinner: function (cmp) {
        this.hideElement(cmp, 'cardIconId');
        this.showElement(cmp, 'cardSpinner');
    },
    hideSpinner: function (cmp) {
        this.hideElement(cmp, 'cardSpinner');
        this.showElement(cmp, 'cardIconId');
    }
})