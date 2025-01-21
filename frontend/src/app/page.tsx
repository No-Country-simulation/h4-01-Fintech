import CardsPlanes from "@/features/dashboard/CardsPlanes";
import { Section } from "@radix-ui/themes";

export default function Home() {
  return (
    <div className="w-full flex justify-center">
      <Section className=" w-full">
        <CardsPlanes />
      </Section>
    </div>
  );
}
