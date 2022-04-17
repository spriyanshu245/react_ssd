import React from 'react';
import { Input } from 'reactstrap';

const WrappedInput = React.forwardRef(function (props, ref) {
	return <Input innerRef={ref} {...props} />;
});

export default WrappedInput;