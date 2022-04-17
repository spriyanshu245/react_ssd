import { Controller } from "react-hook-form";
import Select from "react-select";

export default function WrappedSelect({ control, name, options, ...props }) {
  function render({ field: { onChange, value, ref } }) {
    return (<Select
      {...props}
      options={options}
      ref={ref}
      value={options?.find((option) => option.value == value)}
      onChange={(option) => onChange(option.value)}
    />);
  }

  return <Controller name={name} control={control} render={render} />;
}
