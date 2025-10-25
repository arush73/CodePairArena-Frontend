import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProblemStore } from "@/app/store/useProblemStore";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const RunCodeResults = ({ results }) => {
  const [activeTab, setActiveTab] = useState(
    results?.[0]?.testCase?.toString() || ""
  );

  const { problem } = useProblemStore();

  useEffect(() => {
    setActiveTab(results?.[0].testCase?.toString());
  }, [results]);

  if (!results)
    return (
      <div className="flex items-center justify-center">
        You must run your code first
      </div>
    );

  return (
    <ScrollArea className="h-60 overflow-auto pb-4">
      <div className="w-full pl-4">
        <div>
          {results.every((res) => res.passed) ? (
            <div className="font-bold text-2xl text-green-400 ml-4 mb-4">
              Accepted
            </div>
          ) : (
            <div className="font-bold text-red-600 text-2xl ml-4 mb-4">
              Wrong Answer
            </div>
          )}
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="space-x-4">
            {results.map((res) => (
              <TabsTrigger key={res.testCase} value={res.testCase.toString()}>
                Case {res.testCase}
                {res.passed ? " ✅" : " ❌"}
              </TabsTrigger>
            ))}
          </TabsList>

          {results.map((res) => (
            <TabsContent
              key={res.testCase}
              value={res.testCase.toString()}
              className="p-2"
            >
              {/* <p>
                <b>Input:</b>
                {res.input}
              </p>
              <p>
                <b>Expected Output:</b> {res.expected}
              </p>
              <p>
                <b>Your Output:</b> {res.stdout}
              </p>
              <p>
                <b>Status:</b> {res.status}
              </p>
              <p>
                <b>Time:</b> {res.time}
              </p>
              <p>
                <b>Memory:</b> {res.memory}
              </p>
              {res.stderr && (
                <p>
                  <b>Error:</b> {res.stderr}
                </p>
              )} */}
              <FieldSet>
                {/* <FieldLegend>Profile</FieldLegend>
                                <FieldDescription>
                                  This appears on invoices and emails.
                                </FieldDescription> */}
                <FieldGroup>
                  <Field>
                    <FieldLabel className="text-bold text-1xl">
                      Input:
                    </FieldLabel>
                    <Input
                      autoComplete="off"
                      defaultValue={res.input}
                      disabled={true}
                    />
                  </Field>
                  <Field>
                    <FieldLabel className="text-bold text-1xl">
                      Output
                    </FieldLabel>
                    <Input
                      // id="username"
                      autoComplete="off"
                      // aria-invalid
                      defaultValue={res.stdout}
                      disabled={true}
                    />
                  </Field>
                  <Field>
                    <FieldLabel className="text-bold text-1xl">
                      Expected
                    </FieldLabel>
                    <Input
                      // id="username"
                      autoComplete="off"
                      // aria-invalid
                      disabled={true}
                      defaultValue={res.expected}
                    />
                  </Field>
                </FieldGroup>
              </FieldSet>
              {res.compile_output && (
                <p>
                  <b>Compile Output:</b> {res.compile_output}
                </p>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </ScrollArea>
  );
};

export default RunCodeResults;
