import { Flex, Text } from "@radix-ui/themes";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
    return (
        <>
            <footer>
                <Flex justify={"center"} gap={"4"}>
                    <Flex>
                        <Text>&copy;2021-{new Date().getFullYear()} - All Rights Reserved</Text>
                    </Flex>
                    <Separator orientation="vertical" />
                    <Flex>
                        <Text>Contact Details:</Text>
                    </Flex>
                </Flex>
            </footer>
        </>
    )
}
