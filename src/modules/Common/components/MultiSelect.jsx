import { Controller } from "react-hook-form";
import Select from "react-select";

export default function WrappedSelect({ control, name, options, ...props }) {
  function render({ field: { onChange, value, ref } }) {
    return (<Select
      {...props}
      isMulti
      options={options}
      ref={ref}
      value={options?.filter((option) => value.includes(option.value))}
      onChange={(options) => onChange(options.map(option => option.value))}
    />);
  }

  return <Controller name={name} control={control} render={render} />;
}
