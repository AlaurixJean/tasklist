import { Flex, Alert, AlertIcon } from "@chakra-ui/react"
const Notask = () => {
  return (
    <Flex>
        <Alert status="warning" >
            <AlertIcon>
                Pas de tâche pour le moment.
            </AlertIcon>
        </Alert>
    </Flex>
  )
}

export default Notask