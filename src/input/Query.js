// name:input.Query
// require:input.Input
(function () {

    t.Input.Query = t.Input.extend('Query' , function (query) {
        var index = query.indexOf('['),
            temp;

        this.key = query.slice(0 , index < 0 ? void 0 : index);

        this.phrases = {};

        // name.property
        temp = this.key.split('.');

        if (temp[1]) {
            this.property = temp[1];
        }

        this.name = temp[0];

        if (index > -1) {
            Input.Query.REGEXP.lastIndex = 0;
            while (temp = Input.Query.REGEXP.exec(query)) {

                this.phrases[temp[1]] = {
                    target: null,
                    operator: null,
                    value: temp[3]
                };

                if (temp[2].length > 1) {
                    this.phrases[temp[1]].target = temp[2][0];
                    this.phrases[temp[1]].operator = temp[2][1];
                } else {
                    this.phrases[temp[1]].operator = temp[2] || null;
                }

            }
        }
    });


    /**
     * pointer.down[needle][event][key=value]
     * Yapısı ayıklamak için
     * @type {RegExp}
     */
    t.Input.Query.REGEXP = new RegExp("\\[([^\\]=\?]+)([=\?]{0,2})(.*?)\\]" , "ig");

})();