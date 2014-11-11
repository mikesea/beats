var StringUtils = {

  randKey: function(prefix, length) {
    var length = typeof length !== 'undefined' ? length : 5;
    return prefix + '_' + Math.random().toString(36).slice(2, length);
  }

}

module.exports = StringUtils;
