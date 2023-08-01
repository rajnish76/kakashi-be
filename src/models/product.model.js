const mongoose = require('mongoose');
const { toJSON, paginate, slugGenerator } = require('./plugins');

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
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
    slug: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);
productSchema.plugin(slugGenerator, {
  slugField: 'slug', // Change to the field name where you want to store the slug.
  sourceField: 'title', // Change to the field name from which you want to generate the slug.
});

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
