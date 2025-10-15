import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProblemStore } from "@/app/store/useProblemStore";
import Image from "next/image";

const RunCodeResults = ({ results }) => {
  const [activeTab, setActiveTab] = useState(
    results?.[0]?.testCase?.toString() || ""
  );

  const { problem } = useProblemStore();

  useEffect(() => {
    setActiveTab(results?.[0].testCase?.toString());
  }, [results]);

    if (!results) return (
        <div className="flex items-center justify-center">You must run your code first</div>
    )
    
  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="space-x-2">
          {results.map((res) => (
              <TabsTrigger key={res.testCase} value={res.testCase.toString()}>
                  Case {res.testCase}
                  {res.passed  ?  " ✅": " ❌"}
                 
            </TabsTrigger>
          ))}
        </TabsList>

        {results.map((res) => (
          <TabsContent
            key={res.testCase}
            value={res.testCase.toString()}
            className="p-2"
          >
            <p>
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
            )}
            {res.compile_output && (
              <p>
                <b>Compile Output:</b> {res.compile_output}
              </p>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default RunCodeResults;

