// export const BASE_URL = process.env.NODE_ENV === 'production' 
//   ? 'https://gidalo-new-backend-cs1q7b0lp-frederick-aleoke-malachis-projects.vercel.app'
// : 'https://localhost:5001' ; // Define production URL
 
export const BASE_URL = 'https://gidalo-new-backend.vercel.app';
//export const BASE_URL = '';
export const PROPERTIES_URL = '/api/properties';
export const USERS_URL = '/api/users';
export const LOGIN_URL = '/api/auth/login';
export const REGISTER_URL = '/api/auth/register';
export const CURRENT_USER_URL = '/api/auth/currentuser';
export const FAVOURITES_URL = '/api/favourites';
export const ADD_FAVOURITE_URL = '/api/favourites/add';
export const REMOVE_FAVOURITE_URL = '/api/favourites/remove';
export const UPDATE_USER_URL = '/api/users/update';
export const SEARCH_PROPERTIES_URL = '/api/properties/search';
export const UPLOAD_IMAGE_URL = '/api/upload/image';
export const DOWNLOAD_IMAGE_URL = '/api/download/image';
export const RESET_PASSWORD_URL = '/api/auth/reset-password';
export const SEND_PASSWORD_RESET_EMAIL_URL = '/api/auth/send-password-reset-email';
export const VALIDATE_TOKEN_URL = '/api/auth/validate-token';
export const CHANGE_PASSWORD_URL = '/api/auth/change-password';
export const GET_ALL_FAVOURITE_PROPERTIES_URL = '/api/favourites/all';
export const GET_USER_FAVOURITE_PROPERTIES_URL = '/api/favourites/user';
export const GET_RECENTLY_VIEWED_PROPERTIES_URL = '/api/properties/recently-viewed';
export const GET_POPULAR_PROPERTIES_URL = '/api/properties/popular';
export const GET_FEATURED_PROPERTIES_URL = '/api/properties/featured';
export const GET_RECENTLY_UPDATED_PROPERTIES_URL = '/api/properties/recently-updated';
export const GET_PROPERTY_IMAGES_URL = '/api/properties/images';
export const GET_PROPERTY_REVIEWS_URL = '/api/properties/reviews';
export const GET_PROPERTY_REVIEW_URL = '/api/properties/review';
export const ADD_PROPERTY_REVIEW_URL = '/api/properties/review/add';
export const UPDATE_PROPERTY_REVIEW_URL = '/api/properties/review/update';
export const DELETE_PROPERTY_REVIEW_URL = '/api/properties/review/delete';
export const GET_PROPERTY_FEATURES_URL = '/api/properties/features';
export const GET_PROPERTY_AGENT_URL = '/api/properties/agent';
export const GET_PROPERTY_AGENTS_URL = '/api/properties/agents';
export const GET_PROPERTY_FAQS_URL = '/api/properties/faqs';
export const GET_PROPERTY_BLOG_POSTS_URL = '/api/properties/blog-posts';
export const GET_PROPERTY_BLOG_POST_URL = '/api/properties/blog-post';
export const GET_PROPERTY_BANNERS_URL = '/api/properties/banners';
export const GET_PROPERTY_NEWS_URL = '/api/properties/news';
