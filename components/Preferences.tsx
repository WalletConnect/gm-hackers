import React, { useEffect, useState } from "react";
import {
  AccordionItem,
  AccordionButton,
  Heading,
  AccordionIcon,
  AccordionPanel,
  VStack,
  FormControl,
  FormLabel,
  Switch,
  Button,
  useToast,
} from "@chakra-ui/react";
import { BiSave } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { useSubscriptionScopes, useW3iAccount } from "@web3inbox/widget-react";

function Preferences() {
  const toast = useToast();

  const { account } = useW3iAccount();
  const { scopes, updateScopes } = useSubscriptionScopes(account);

  const { register, setValue, handleSubmit } = useForm();
  const [isSavingPreferences, setIsSavingPreferences] = useState(false);

  const onSubmitPreferences = handleSubmit(async (formData) => {
    setIsSavingPreferences(true);
    const enabledScopes = Object.entries(formData)
      .filter(([key, isEnabled]) => isEnabled)
      .map(([key]) => key);
    try {
      const isUpdated = await updateScopes(enabledScopes);
      if (isUpdated) {
        toast({
          title: "Preferences updated",
          status: "success",
          variant: "subtle",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to update preferences",
        status: "error",
        variant: "subtle",
      });
    } finally {
      setIsSavingPreferences(false);
    }
  });

  // Set default values of selected preferences
  useEffect(() => {
    Object.entries(scopes).forEach(([scopeKey, scope]) => {
      const s: any = scope;
      setValue(scopeKey, s.enabled);
    });
  }, [scopes, setValue]);

  return (
    <AccordionItem>
      <AccordionButton>
        <Heading as="span" fontSize="md" flex="1" textAlign="left">
          Preferences
        </Heading>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4} display="flex" flexDir="column">
        <VStack as="form" onSubmit={onSubmitPreferences}>
          {Object.entries(scopes)?.map(([scopeKey, scope]) => {
            return (
              <FormControl
                key={scopeKey}
                display="flex"
                justifyContent="space-between"
                gap={4}
              >
                <FormLabel htmlFor={scopeKey}>{scope.name}</FormLabel>
                <Switch
                  id={scopeKey}
                  defaultChecked={(scope as any).enabled}
                  {...register(scopeKey)}
                />
              </FormControl>
            );
          })}
          <Button
            leftIcon={<BiSave />}
            alignSelf="flex-end"
            variant="outline"
            colorScheme="blue"
            type="submit"
            rounded="full"
            isLoading={isSavingPreferences}
            loadingText="Saving..."
          >
            Save preferences
          </Button>
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default Preferences;
