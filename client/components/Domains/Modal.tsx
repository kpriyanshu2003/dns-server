"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Input,
} from "@nextui-org/react";
import { FiPlus } from "react-icons/fi";

export default function DomainModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSubmit = (closeFunc: { (): void; (): void }) => {
    console.log("opened");
    closeFunc();
  };

  return (
    <>
      <Button onPress={onOpen} className="rounded-lg" color="primary">
        <FiPlus /> New Domain
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add a new Domain
              </ModalHeader>
              <ModalBody>
                <Input type="text" label="Domain Name" />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => handleSubmit(onClose)}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
