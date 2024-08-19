import { Helmet } from 'react-helmet-async';

const Meta = ({
  title = 'Gidalo',
  description = 'We provide you with a unique set of real estate deals',
  keywords = 'real-estate, properties, apartments, flats, duplex, bedrooms',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

export default Meta;
