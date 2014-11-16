var StringUtils = {

  randKey: function(prefix, length) {
    var length = typeof length !== 'undefined' ? length : 5,
          rand = Math.random().toString(36).slice(2, length + 2);

    return prefix ? [ prefix, rand ].join('_') : rand
  }

}

module.exports = StringUtils;
