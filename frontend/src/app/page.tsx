import CardsPlanes from "@/features/dashboard/CardsPlanes";
import InvestmentProfileHandler from "@/features/profile/InvestmentProfileHandler";
import DialogWelcome from "@/features/notification/dialogWelcome";
import { Section } from "@radix-ui/themes";

export default function Home() {
  return (
    <div className="w-full flex justify-center">
      <InvestmentProfileHandler />
      <DialogWelcome/>
      <Section className=" w-full">
        <CardsPlanes />
      </Section>
    </div>
  );
}
