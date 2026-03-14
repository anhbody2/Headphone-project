interface Props {
  name: string;
  placeholder: string;
  type?: string;
}

export function Input({name, placeholder, type = "text" }: Props) {
  return (
    <input
      required
      name={name}
      type={type}
      placeholder={placeholder}
      className="
        w-full 
        px-4 
        py-3 
        rounded-lg 
        bg-gray-100 
        text-sm 
        outline-none 
        focus:ring-2 
        focus:ring-red-400
        placeholder:text-gray-400
      "
    />
  );
}
export function Checkbox({name, placeholder, type = "checkbox" }: Props) {
  return (
    <div>
      <input
      name={name}
      type={type}
      className="
        rounded
        px-4 
        py-3 
        rounded-lg 
        bg-gray-100 
        text-sm 
        outline-none 
        focus:ring-2 
        focus:ring-red-400
        placeholder:text-gray-400
      "
    />
    <label className="text-sm text-gray-600 ml-2">{placeholder}</label>
    </div>
    
  );
}