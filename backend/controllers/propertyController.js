import asyncHandler from '../middleware/asyncHandler.js';
import Property from '../models/propertyModel.js';

// @desc    Fetch all Properties
// @route   GET /api/Properties
// @access  Public
const getProperties = asyncHandler(async (req, res) => { 
    const properties = await Property.find({});
  res.json(properties);
});

// @desc    Fetch single property
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (property) {
    return res.json(property);
  } else {
    res.status(404);
    throw new Error('Property not found');
  }
});

// // @desc    Create a property
// // @route   POST /api/Properties
// // @access  Private/Admin
// const createProperty = asyncHandler(async (req, res) => {
//   const property = new Property({
//     title: 'Sample name',
//     price: 0,
//     user: req.user._id,
//     images: '/images/sample.jpg',
//     location: 'Sample brand',
//     category: 'Sample category',
//     countInStock: 0,
//     numReviews: 0,
//     description: 'Sample description',
//     bedrooms: '3',
//     bathrooms: '2',
//     swimmingPool: false,
//     parkingSpace: 0,
//     toilets: '2',
//     nearbySchools: ['Troika', 'Rehoboth'],
//     nearbyHospitals: ['General Hospital', 'ICU'],
//     nearbySupermarkets: ['Sample supermarket', 'Sample supermarket 2'],
//   });

//   const createdProperty = await property.save();
//   res.status(201).json(createdProperty);
// });

// // @desc    Update a property
// // @route   PUT /api/Properties/:id
// // @access  Private/Admin
// const updateproperty = asyncHandler(async (req, res) => {
//   const { name, price, description, image, brand, category, countInStock } =
//     req.body;

//   const property = await property.findById(req.params.id);

//   if (property) {
//     property.title = title;
//     property.price = price;
//     property.description = description;
//     property.images = images;
//     property.category = category;
//     property.countInStock = countInStock;

//     const updatedProperty = await property.save();
//     res.json(updatedProperty);
//   } else {
//     res.status(404);
//     throw new Error('Property not found');
//   }
// });

// // @desc    Delete a property
// // @route   DELETE /api/Properties/:id
// // @access  Private/Admin
// const deleteproperty = asyncHandler(async (req, res) => {
//   const property = await Property.findById(req.params.id);

//   if (property) {
//     await Property.deleteOne({ _id: property._id });
//     res.json({ message: 'Property removed' });
//   } else {
//     res.status(404);
//     throw new Error('Property not found');
//   }
// });

// // @desc    Create new review
// // @route   POST /api/Properties/:id/reviews
// // @access  Private
// const createPropertyReview = asyncHandler(async (req, res) => {
//   const { rating, comment } = req.body;

//   const property = await Property.findById(req.params.id);

//   if (property) {
//     const alreadyReviewed = property.reviews.find(
//       (r) => r.user.toString() === req.user._id.toString()
//     );

//     if (alreadyReviewed) {
//       res.status(400);
//       throw new Error('Property already reviewed');
//     }

//     const review = {
//       name: req.user.name,
//       rating: Number(rating),
//       comment,
//       user: req.user._id,
//     };

//     property.reviews.push(review);

//     property.numReviews = property.reviews.length;

//     property.rating =
//       property.reviews.reduce((acc, item) => item.rating + acc, 0) /
//       property.reviews.length;

//     await property.save();
//     res.status(201).json({ message: 'Review added' });
//   } else {
//     res.status(404);
//     throw new Error('Property not found');
//   }
// });

// // @desc    Get top rated Properties
// // @route   GET /api/Properties/top
// // @access  Public
// const getTopProperties = asyncHandler(async (req, res) => {
//   const Properties = await Property.find({}).sort({ rating: -1 }).limit(3);

//   res.json(Properties);
// });

export {
  getProperties,
  getPropertyById,
//   createProperty,
//   updateproperty,
//   deleteproperty,
//   createPropertyReview,
//   getTopProperties,
};
