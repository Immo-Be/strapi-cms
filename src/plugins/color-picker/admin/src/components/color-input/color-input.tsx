import * as React from "react";

const Input = React.forwardRef(
  (props: any, ref: React.ForwardedRef<HTMLInputElement>) => {
    const { attribute, disabled, intlLabel, name, onChange, required, value } =
      props; // these are just some of the props passed by the content-manager

    console.log(props, "props");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        target: { name, type: attribute.type, value: e.currentTarget.value },
      });
    };

    return (
      <label>
        Custom Color Picker
        <input
          ref={ref}
          name={name}
          disabled={false}
          value={value}
          required={required}
          onChange={handleChange}
          type="color"
        />
      </label>
    );
  }
);

export default Input;
