import Select from 'react-select';

const customDropDown = () => {
  return (
    <div className="p-2 cursor-pointer">
      <svg
        className="flex-shrink-0 ml-2 mr-1 fill-current text-gray-400"
        width="11"
        height="7"
        viewBox="0 0 11 7">
        <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
      </svg>
    </div>
  );
};

const Menu = ({ innerProps, children }) => {
  return (
    <div
      {...innerProps}
      style={{ maxWidth: '200px' }}
      className="bg-white max-h-40 overflow-auto customReactSelectMenu rounded mt-1 border absolute w-full">
      {children}
    </div>
  );
};
const CustomSelect = (props) => {
  return (
    <Select
      value={props.selected}
      components={{
        IndicatorSeparator: () => null,
        Menu: props.CustomMenu ? props.CustomMenu : Menu,
        DropdownIndicator: customDropDown,
      }}
      options={props.options}
      onChange={props.onChangeHandler}
      getOptionLabel={(option) =>
        props.customLabel ? option[props.customLabel] : option.label ? option.label : option.value
      }
      getOptionValue={(option) => (props.customValue ? option[props.customValue] : option.value)}
      styles={{
        control: (css) => ({
          ...css,
          backgroundColor: 'transparent',
          width: '100%',
          minWidth: '200px',
        }),
        input: (css) => ({
          ...css,
          color: `${props.theme === 'white' ? 'white' : 'black'}`,
          outline: 'none',
        }),
        indicatorContainer: (css) => ({ ...css, outline: 'none', padding: '200px' }),
        singleValue: (css) => ({
          ...css,
          color: props.theme === 'white' ? '#E2E8F0' : '#1E293B',
          marginRight: '0px',
        }),
        valueContainer: (provided, state) => ({
          ...provided,
          padding: '2px 0px 2px 8px',
          fontSize: '14px',
        }),
        container: (css) => ({ ...css, width: '100%' }),
      }}
    />
  );
};

export default CustomSelect;
