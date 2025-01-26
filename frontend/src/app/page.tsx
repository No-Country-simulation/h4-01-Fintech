import CardsPlanes from "@/features/dashboard/CardsPlanes";
import Session1 from "@/features/home/session1";
import { Flex, Section } from "@radix-ui/themes";

export default function Home() {
  return (
    <Flex direction={"column"}>
      <Session1></Session1>
      <Section className="w-full min-h-screen flex items-center justify-center">
        <CardsPlanes />
      </Section>
    </Flex>
  );
}
