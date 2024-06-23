"use client";

import React, { useState } from "react";
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
import { FiPlus, FiTrash2 } from "react-icons/fi";
import classNames from "classnames";
import { createDomain, deleteDomainById } from "@/actions/domain";
import { toast } from "sonner";

export function DomainModalNewDomain() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");

  const handleSubmit = () => {
    createDomain(name)
      .then(() => toast.success("Domain Added"))
      .then(() => setName(""))
      .then(onClose)
      .catch((e) => {
        console.error(e);
        toast.error(e.message);
      });
  };

  return (
    <>
      <Button onPress={onOpen} className="rounded-lg" color="primary">
        <FiPlus /> New Domain
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl" backdrop="blur">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add a new Domain
            </ModalHeader>
            <ModalBody>
              <span>Enter the domain that you would like to add:</span>
              <Input
                type="text"
                label="Domain Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  onClose();
                  setName("");
                }}
              >
                Close
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Add Domain
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}

export function DomainModalDeleteDomain({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteText, setDeleteText] = useState("");

  const handleDelete = () => {
    deleteDomainById(id)
      .then(() => toast.success("Domain Deleted"))
      .then(() => setDeleteText(""))
      .then(onClose)
      .catch((e) => {
        console.log(e);
        toast.error(e.message);
      });
  };

  return (
    <>
      <FiTrash2 className="h-4 w-4 cursor-pointer" onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Domain
            </ModalHeader>
            <ModalBody className="text-sm">
              <span>Are you sure you want to delete the {name} domain?</span>
              <span className="text-red-400 font-bold">
                This cannot be undone
              </span>
              <Input
                type="text"
                label="Type DELETE to confirm"
                labelPlacement="outside"
                placeholder=" "
                value={deleteText}
                onChange={(e) => setDeleteText(e.target.value)}
                classNames={{ label: "text-sm" }}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="default"
                variant="light"
                onPress={() => {
                  setDeleteText("");
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                color="danger"
                variant="flat"
                onPress={handleDelete}
                className={classNames({
                  "cursor-not-allowed": deleteText !== "DELETE",
                })}
                isDisabled={deleteText !== "DELETE"}
              >
                Delete Domain
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
