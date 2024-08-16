import asyncHandler from '../middleware/asyncHandler.js';
import Favourite from '../models/favouriteModel.js';
import favourite from '../models/favouriteModel.js';
import Property from '../models/propertyModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addFavouriteItems = asyncHandler(async (req, res) => {
  const { favouriteItems } = req.body;

  if (favouriteItems && favouriteItems.length === 0) {
    res.status(400);
    throw new Error('No favourite items');
  } else {
    
    // get the favourite items from our database
    const itemsFromDB = await Property.find({
      _id: { $in: favouriteItems.map((x) => x._id) },
    });

    // map over the favourite items and use the price from our items from database
    const dbFavouriteItems = favouriteItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );
      return {
        ...itemFromClient,
        property: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      };
    });


    const favourite = new Favourite({
      favouriteItems: dbFavouriteItems,
      user: req.user._id,
      price,
    });

    const createdFavourite = await favourite.save();

    res.status(201).json(createdFavourite);
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyFavourites = asyncHandler(async (req, res) => {
  const favourites = await Favourite.find({ user: req.user._id });
  res.status(200).json(favourites);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getFavouriteById = asyncHandler(async (req, res) => {
  const favourite = await Favourite.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (favourite) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('No favourite selection found');
  }
});



// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getFavourites = asyncHandler(async (req, res) => {
  const favourites = await Favourite.find({}).populate('user', 'id title');
  res.json(favourites);
});

export {
    addFavouriteItems,
    getMyFavourites,
    getFavouriteById,
    getFavourites,
};
