import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useAppDispatch, useAppSelector } from "@/Redux/Hook"
import { getUserSubscription, upgradeSubscription } from "@/Redux/Subscription/Action"
import { CheckCircleIcon } from "lucide-react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const UpgradeSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { subscription } = useAppSelector(store => store);
  const queryParams = new URLSearchParams(window.location.search);
  const paymentId = queryParams.get("razorpay_payment_id");
  const planType = queryParams.get("planType")
// http://localhost:5173/upgrade_plan/success/?planType=MONTHLY&razorpay_payment_id=pay_Pvs3c1iMB41N6S&razorpay_payment_link_id=plink_Pvrzl3jNcmuLAp&razorpay_payment_link_reference_id=&razorpay_payment_link_status=paid&razorpay_signature=f77f03d34b5df071388e993ca8ae6146bf1479190e83161e1ef4683e2138541c
  useEffect(() => {
    console.log(paymentId," : ", planType);
    
    if (planType && paymentId) { 
      dispatch(upgradeSubscription(planType)) 
      // dispatch(getUserSubscription())
    }
  }, []);
  return (
    <div className="flex justify-center">
      <Card className="mt-20 p-5 space-y-5 flex flex-col items-center">
        <div className="flex items-center gap-4">
          <CheckCircleIcon className="h-9 w-9 text-green-500" />
          <p className="text-xl">Plan Upgraded Successfully</p>

        </div>
        <div className="space-y-3">
          <p className="text-green-500">start date: </p>
          <p className="text-red-500">end date: </p>
          <p >plan type: </p>
        </div>
        <Button onClick={() => navigate("/")}>Go to Dashboard</Button>
      </Card>
    </div>
  )
}

export default UpgradeSuccess