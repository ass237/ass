import React from "react";

// Define the type of the blood bank object according to the schema
interface BloodBankProps {
  name: string;
  address: string;
  contact: string;
  email: string;
  A_positive: number;
  A_negative: number;
  B_positive: number;
  B_negative: number;
  AB_positive: number;
  AB_negative: number;
  O_positive: number;
  O_negative: number;
  lastUpdated?: string;
}

const BloodBankDetails: React.FC<BloodBankProps> = ({
  name,
  address,
  contact,
  email,
  A_positive,
  A_negative,
  B_positive,
  B_negative,
  AB_positive,
  AB_negative,
  O_positive,
  O_negative,
}) => {
  // Blood types with corresponding quantities
  const availableBloodTypes = [
    { type: "A+", quantity: A_positive },
    { type: "A-", quantity: A_negative },
    { type: "B+", quantity: B_positive },
    { type: "B-", quantity: B_negative },
    { type: "AB+", quantity: AB_positive },
    { type: "AB-", quantity: AB_negative },
    { type: "O+", quantity: O_positive },
    { type: "O-", quantity: O_negative },
  ];

  // Get the maximum quantity to normalize the progress bar sizes
  const maxBloodLevel = Math.max(...availableBloodTypes.map(blood => blood.quantity));

  return (
    <div className="w-2/3 bg-white shadow-md rounded-lg p-3 mb-3 ml-2 relative overflow-hidden group"> {/* Adjust width to 2/3 here */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
      <p className="text-gray-600 text-sm mb-2">
        <strong>Address:</strong> {address}
      </p>
      <p className="text-gray-600 text-sm mb-2">
        <strong>Contact:</strong> {contact}
      </p>
      <p className="text-gray-600 text-sm mb-2">
        <strong>Email:</strong> {email}
      </p>

      <div className="mt-3">
        <h4 className="text-md font-semibold text-gray-800 mb-2">Available Blood Types</h4>
        <div className="flex flex-col">
          {availableBloodTypes.map(({ type, quantity }) => (
            quantity > 0 && (
              <div key={type} className="mb-2 group-hover:block hidden">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">{type}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-red-500 rounded-full"
                    style={{ width: `${(quantity / maxBloodLevel) * 100}%` }} // Scale based on max value
                  ></div>
                </div>
                
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default BloodBankDetails;
