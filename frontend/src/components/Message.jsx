import { Alert} from 'react-bootstrap'

const Message = ({variant, children}) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
    varaiant: 'info'
};

export default Message