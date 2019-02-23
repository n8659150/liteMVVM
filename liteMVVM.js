class LiteMVVM {
    constructor (options) {
        this.$el = options.el;
        if (this.$el) {
            new Compile(this.$el, this);
        }
        this.$data = options.data;
    }
}