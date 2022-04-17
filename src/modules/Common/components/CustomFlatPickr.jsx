import React from 'react';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

const CustomFlatPickr = React.forwardRef(function (props, ref)
{
  const options = Object.assign(props.options ?? {}, {
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Z",
  });

	return <Flatpickr {...props} onChange={([value]) => props.onChange(value)} options={options} />
});

export default CustomFlatPickr;