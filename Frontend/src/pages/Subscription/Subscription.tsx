import { useAppDispatch, useAppSelector } from "@/Redux/Hook"
import SubscriptionCard from "./SubscriptionCard"
import { SubscriptionState } from "@/Redux/Subscription/Reducer"
import { useEffect } from "react"
import { getUserSubscription } from "@/Redux/Subscription/Action"

const paidPlan: string[] = [
    "Add unlimited project"
    , "Access to live chat"
    , "Add unlimited teem member"
    , "Advance Reporting"
    , "Priority Support"
    , "Customization Options"
    , "Integration Support"
    , "Advanced Security"
    , "Training and Resources"
    , "Access Control"
    , "Custom Workflows"
]
const annualPlan: string[] = [
    "Add unlimited project"
    , "Access to live chat"
    , "Add unlimited teem member"
    , "Advance Reporting"
    , "Priority Support"
    , "Everything which monthly plan has"
]
const freePlan: string[] = [
    "Add only 3 projects"
    , "Basic Task Management"
    , "Project Collaboration"
    , "Basic Reporting"
    , "Email Notifications"
    , "Basic Access Control"
]

const Subscription = () => {
  const dispatch = useAppDispatch();
  const  subscription :SubscriptionState = useAppSelector(store => store.subscription);
  console.log("subscription",subscription)
  useEffect(() => {
   dispatch(getUserSubscription(localStorage.getItem("jwt") || ""));
  },[]);
    return (
        <div className="p-10">
            <h1 className="text-5xl font-semibold py-5 pb-16 text-center">
                Pricing
            </h1>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-9">
                <SubscriptionCard data={{ planName: "Free", features: freePlan, planType: "FREE", price: 0, buttonName: subscription.userSubscription?.planType==="FREE" ? "Current Plan" : "Get Started" }} />
                <SubscriptionCard data={{ planName: "Monthly Paid Plan", features: paidPlan, planType: "MONTHLY", price: 799, buttonName: subscription.userSubscription?.planType ==="MONTHLY"? "Current Plan" : "Get Started" }} /> <SubscriptionCard data={{ planName: "Annual Paid Plan", features: annualPlan, planType: "ANNUALLY", price: 6711, buttonName: subscription.userSubscription?.planType === "ANNUALLY" ? "Current Plan" : "Get Started" }} /> </div>
        </div>
    )
}

export default Subscription;