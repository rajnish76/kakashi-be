const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const { toJSON, paginate } = require('./plugins');

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      slug: 'name',
      unique: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);
categorySchema.plugin(slug, {
  separator: '-',
  lang: 'en',
  truncate: 120,
});

/**
 * @typedef Category
 */
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
