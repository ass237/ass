import React from 'react';


interface DropdownProps {
  isOpen: boolean;
  options: { label: string; onClick: () => void }[];
  onClose: () => void;
}

export default function Dropdown({ isOpen, options, onClose }: DropdownProps) {
  if (!isOpen) return null;

  return (
    <div
      className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-48 py-2 z-10"
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the dropdown
    >
      <ul className="flex flex-col">
        {options.map((option, index) => (
          <li
            key={index}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              option.onClick();
              onClose(); // Close dropdown after an action
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
