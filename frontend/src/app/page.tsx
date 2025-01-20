import { Button, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Flex direction="column" gap="2">
        <Text>Hello from Radix Themes :)</Text>
        <Button>Let's go</Button>
      </Flex>
    </div>
  );
}