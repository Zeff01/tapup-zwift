import { steps } from "@/constants";


const MultiStepProgress = ({ currentStep }: any) => {
  return (
    <div className="w-full flex gap-3 pb-5">
      {steps.map((item, index) => (
        <div className="w-full" key={index}>
          <div className="">
            <div className="flex flex-col">
              <div
                key={item.name}
                className={`w-auto h-2 rounded-full ${currentStep === index+1 ? "bg-green-500" : "bg-[#A1A1AA]"}`}
              ></div>
              <h2
                className={`text-xs py-2 ${currentStep === index +1? "text-green-500" : "text-[#A1A1AA]"}`}
              >
                {item.name}
              </h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MultiStepProgress;
