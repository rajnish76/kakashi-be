const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const { toJSON, paginate } = require('./plugins');

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      slug: 'title',
      unique: true,
    },
    imageUrl: {
      type: String,
    },
    price: {
      type: Number,
      default: 1,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    description: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    color: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);
productSchema.plugin(slug, {
  separator: '-',
  lang: 'en',
  truncate: 120,
});

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
