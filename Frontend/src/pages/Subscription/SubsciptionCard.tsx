import { Button } from "@/components/ui/button";
import { CheckCircleIcon } from "lucide-react";

{/* <SubsciptionCard data={{ planname: "Annual Paid Plan", fetures: annualPlan, 
    planType: "ANNUALLY", price: 6711,
     buttonName: true ? "Current Plan" : "Get Started" }} /> */}
interface PropsInterface {
    data: {
        planName: string;
        features: string[];
        planType: string;
        price: number;
        buttonName: string;
    };
}

const SubsciptionCard = ({ data }: PropsInterface) => {
    return (
        <div className="rounded-xl bg-[#1b1b1b] bg-opacity-20 shadow-[#14173b] shadow-2xl card p-5 space-y-5 w-[19rem]">
            <p>{data.planName}</p>
            <p>
                <span className="text-xl font-semibold">₹{data.price}/</span>
                <span>{data.planType}</span>
            </p>
            {
                data.planType == "ANNUALLY" && <p className="text-green-500">30% off</p>
            }
            <Button className="w-full" >
                {data.buttonName}
            </Button>
            <div className="">
                {
                    data.features.map((feature,index) =>
                        <div key={index} className="flex items-center gap-2">
                            <CheckCircleIcon />
                            <p>{feature}</p>
                        </div>

                    )
                }
            </div>
        </div>
    )
}

export default SubsciptionCard