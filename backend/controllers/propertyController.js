import asyncHandler from '../middleware/asyncHandler.js';
import Property from '../models/propertyModel.js';

// @desc    Fetch all Properties
// @route   GET /api/Properties
// @access  Public
const getProperties = asyncHandler(async (req, res) => {
  const pageSize = 4; // Set a default value for pagination
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        $or: [
          { title: { $regex: req.query.keyword, $options: 'i' } },
          { category: { $regex: req.query.keyword, $options: 'i' } },
          { description: { $regex: req.query.keyword, $options: 'i' } },
          { location: { $regex: req.query.keyword, $options: 'i' } },
          
          // Add other fields here as needed
        ],
      }
    : {};
    const category = req.params.category
        ? {
              category: req.params.category,
          }
        : {};

  const count = await Property.countDocuments({ ...keyword, ...category });
  const properties = await Property.find({ ...keyword, ...category})
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ properties, page, pages: Math.ceil(count / pageSize) });
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

// @desc    Create a property
// @route   POST /api/Properties
// @access  Private/Admin
const createProperty = asyncHandler(async (req, res) => {
  const property = new Property({
    title: '4 Bedroom Apartment',
    price: 'N100,000,000',
    user: req.user._id,
    images: [],
    location: 'Lekki',
    category: 'category here',
    countInStock: 0,
    numReviews: 0,
    description: 'description here',
    bedrooms: 3,
    bathrooms: 3,
    swimmingPool: false,
    parkingSpace: 1,
    toilets: 2,
    rating: 1,
    state: 'Lagos',
    reviews: [],
    nearbySchools: 'School name here',
    nearbyHospitals: 'Hospital name here',
    nearbySupermarkets: 'Supermarket name here',
  });
console.log(req);
  const createdProperty = await property.save();
  res.status(201).json(createdProperty);
});

// @desc    Update a property
// @route   PUT /api/Properties/:id
// @access  Private/Admin


const updateProperty = asyncHandler(async (req, res) => {
  const { 
    title, price, description, images, category, countInStock,
    location, bedrooms, bathrooms, swimmingPool, parkingSpace, toilets,
    state, nearbySchools, nearbyHospitals, nearbySupermarkets, numReviews 
  } = req.body;

  // Ensure that nearbySchools, nearbyHospitals, and nearbySupermarkets are arrays
  const foundProperty = await Property.findById(req.params.id);

  if (foundProperty) {
    foundProperty.title = title;
    foundProperty.price = price;
    foundProperty.description = description;

    foundProperty.images = Array.isArray(images) && images.every(img => typeof img === 'string') 
                           ? images 
                           : [];

    foundProperty.category = category;
    foundProperty.countInStock = countInStock;
    foundProperty.location = location;
    foundProperty.bedrooms = bedrooms;
    foundProperty.bathrooms = bathrooms;
    foundProperty.swimmingPool = swimmingPool;
    foundProperty.parkingSpace = parkingSpace;
    foundProperty.toilets = toilets;
    foundProperty.state = state;

    // Ensure correct data types
    foundProperty.nearbySchools = nearbySchools || [];
    foundProperty.nearbyHospitals = nearbyHospitals || [];
    foundProperty.nearbySupermarkets = nearbySupermarkets || [];
    foundProperty.numReviews = numReviews;

    const updatedProperty = await foundProperty.save();
    res.json(updatedProperty);
  } else {
    res.status(404);
    throw new Error('Property not found');
  }
});


// @desc    Delete a property
// @route   DELETE /api/Properties/:id
// @access  Private/Admin
const deleteproperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (property) {
    await Property.deleteOne({ _id: property._id });
    res.json({ message: 'Property removed' });
  } else {
    res.status(404);
    throw new Error('Property not found');
  }
});

// @desc    Create new review
// @route   POST /api/Properties/:id/reviews
// @access  Private
const createPropertyReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const property = await Property.findById(req.params.id);

  if (property) {
    const alreadyReviewed = property.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Property already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    property.reviews.push(review);

    property.numReviews = property.reviews.length;

    property.rating =
      property.reviews.reduce((acc, item) => item.rating + acc, 0) /
      property.reviews.length;

    await property.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Property not found');
  }
});

// @desc    Get top rated Properties
// @route   GET /api/Properties/top
// @access  Public
const getTopProperties = asyncHandler(async (req, res) => {
  const properties = await Property.find({}).sort({ rating: -1 }).limit(3);

  res.json(properties);
});

export {
  getProperties,
  getPropertyById,
  createProperty,
   updateProperty,
   deleteproperty,
   createPropertyReview,
   getTopProperties,
};
