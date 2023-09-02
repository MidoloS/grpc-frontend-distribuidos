// options: [{ value: '1', label: '1' }, { value: '2', label: '2' }]
export const Select = ({ options }) => (
  <select>
    {options.map((option) => (
      <option value={option.value} key={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
