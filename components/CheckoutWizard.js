/** @format */

import { FaCheckCircle } from "react-icons/fa";

import React from "react";

export default function CheckoutWizard({ activeStep = 0 }) {
	return (
		<div className="px-8 my-5 flex text-[.7rem] md:text-[1.2rem] gap-4 flex-wrap">
			{["Shipping Address", "Payment Method", "Place Order"].map(
				(step, index) => (
					<div
						key={step}
						className={`flex-1 border-b-2 text-center py-2 flex items-center gap-1 flex-col
            ${
							index <= activeStep
								? "border-green-500   text-green-500"
								: "border-gray-400 text-gray-400"
						}
            `}>
						<FaCheckCircle color={index <= activeStep ? "#32a852" : ""} />
						{step}
					</div>
				),
			)}
		</div>
	);
}
