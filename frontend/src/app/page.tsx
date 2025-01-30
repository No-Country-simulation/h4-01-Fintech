import CardsPlanes from "@/features/dashboard/CardsPlanes";
import Section2 from "@/features/home/section2";
import Section3 from "@/features/home/section3";
import Section4 from "@/features/home/section4";
import Section1 from "@/features/home/section1";
import { Flex, Section } from "@radix-ui/themes";

export default function Home() {
  return (
    <Flex direction={"column"} >
      <Section1></Section1>
        <Section2/>
      <Section className="w-full min-h-screen flex items-center justify-center">
        <CardsPlanes />
      </Section>
      <Section className="w-full min-h-screen flex items-center justify-center">
        <Section3/>
      </Section>
      <Section className="w-full min-h-screen flex items-center justify-center">
        <Section4 />
      </Section>
    </Flex>
  );
}
