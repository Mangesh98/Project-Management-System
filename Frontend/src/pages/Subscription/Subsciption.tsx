import SubsciptionCard from "./SubsciptionCard"

const paidPlan: string[] = [
    "Add unlimited project"
    , "Access to live chat"
    , "Add unlimited teem member"
    , "Advance Reporting"
    , "Priority Support"
    , "Customization Options"
    , "Integration Support"
    , "Advanced Security"
    , "Trainig and Resources"
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
    , "Email Notifiacation"
    , "Basic Access Control"
]

const Subsciption = () => {
    return (
        <div className="p-10">
            <h1 className="text-5xl font-semibold py-5 pb-16 text-center">
                Pricing
            </h1>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-9">
                <SubsciptionCard data={{ planName: "Free", features: freePlan, planType: "FREE", price: 0, buttonName: true ? "Current Plan" : "Get Started" }} />
                <SubsciptionCard data={{ planName: "Monthly Paid Plan", features: paidPlan, planType: "MONTHLY", price: 799, buttonName: true ? "Current Plan" : "Get Started" }} />
                <SubsciptionCard data={{ planName: "Annual Paid Plan", features: annualPlan, planType: "ANNUALLY", price: 6711, buttonName: true ? "Current Plan" : "Get Started" }} />
            </div>
        </div>
    )
}

export default Subsciption