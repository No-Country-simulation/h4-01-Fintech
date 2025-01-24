import CardsPlanes from "@/features/dashboard/CardsPlanes";
import DialogWelcome from "@/features/notification/dialogWelcome";
import { Section } from "@radix-ui/themes";

export default function Home() {
  return (
    <div className="w-full flex justify-center">
      <div className='fixed top-0 right-0'>
        <DialogWelcome />
      </div>
      <Section className=" w-full">
        <CardsPlanes />
      </Section>
    </div>
  );
}
