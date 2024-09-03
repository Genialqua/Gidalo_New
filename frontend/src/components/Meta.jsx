import { Helmet } from 'react-helmet-async';

const Meta = ({ 
  title = 'Gidalo', 
  description = 'We showcase the best properties within your budget.', 
  keywords = 'properties, shared apartments available, properties for sale in lagos, real estate websites in Nigeria, properties for rent in lagos, shortlets properties in lagos, apartments for sale in lekki, flats for sale in lagos, duplex for sale in lekki, duplex for rent in lekki', 
  canonical 
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
};

export default Meta;





// import { Helmet } from 'react-helmet';

// const Meta = ({ title, description, keywords, canonical }) => {
//   return (
//     <Helmet>
//       <title>{title}</title>
//       <meta name='description' content={description} />
//       <meta name='keywords' content={keywords} />
//       {canonical && <link rel="canonical" href={canonical} />}
//     </Helmet>
//   );
// };

// Meta.defaultProps = {
//   title: 'Gidalo',
//   description: 'We showcase the best properties within your budget.',
//   keywords: 'properties, buy properties, real estate, properties, apartments, flats, duplex, bedrooms',
// };

// export default Meta;




// import { Helmet } from 'react-helmet-async';

// const Meta = ({
//   title = 'Gidalo',
//   description = 'We provide you with a unique set of real estate deals',
//   keywords = 'real-estate, properties, apartments, flats, duplex, bedrooms',
// }) => {
//   return (
//     <Helmet>
//       <title>{title}</title>
//       <meta name='description' content={description} />
//       <meta name='keyword' content={keywords} />
//     </Helmet>
//   );
// };

// export default Meta;
