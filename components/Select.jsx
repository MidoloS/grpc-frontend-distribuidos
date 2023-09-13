// options: [{ value: '1', label: '1' }, { value: '2', label: '2' }]
export const Select = ({ options, multiple, selectKey, name, required }) => {
  console.log({ selectKey });
  return (
    <select
      className="border border-slate-300 p-2 rounded-md text-slate-600 caret-black cursor-pointer w-full max-w-[200px]"
      key={selectKey}
      name={name}
      required={required}
    >
      {options.map((option) => (
        <option
          value={option.value}
          key={`${selectKey}-${option.value}`}
          multiple={multiple}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};
