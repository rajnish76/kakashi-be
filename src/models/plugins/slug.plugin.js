const slugify = require('slugify');

module.exports = function slugifyPlugin(schema, options) {
  const slugField = options && options.slugField ? options.slugField : 'slug';
  const sourceField = options && options.sourceField ? options.sourceField : 'title';

  schema.pre('save', function (next) {
    if (!this.isModified(sourceField)) {
      return next();
    }

    const slugOptions = {
      lower: true,
      strict: true,
    };

    this[slugField] = slugify(this[sourceField], slugOptions);
    next();
  });
};
