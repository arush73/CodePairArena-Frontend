"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Editor from "@monaco-editor/react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { SparklesCore } from "@/components/ui/sparkles";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProblemStore } from "@/app/store/useProblemStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LoaderFour } from "@/components/ui/loader";
import Description from "./Description";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Submission from "./Submission";
import { toast } from "sonner";
import RunCodeResults from "./RunCodeResults";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/ui/code-block";

const Page = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("JAVA");
  const [openSubmissionDialog, setOpenSubmissionDialog] = useState(false);
  const [testTabValue, setTestTabValue] = useState("testCase");
  const {
    problem,
    getProblemDetails,
    isCodeRunning,
    isCodeSubmitting,
    executeCode,
    submitCode,
    isProblemLoading,
    runCodeResults,
    submitCodeResults,
    getSubmisions,
    submissions,
    areSubmissionsLoading,
  } = useProblemStore();

  const params = useParams();
  const problemId = params.id;

  const router = useRouter();

  useEffect(() => {
    getProblemDetails(problemId);
  }, [problemId, getProblemDetails]);

  const [editorValue, setEditorValue] = useState("");
  useEffect(() => {
    if (problem) {
      const arrayToObject = (arr) => {
        return arr.reduce((acc, curr) => {
          acc[curr.language] = curr.code;
          return acc;
        }, {});
      };
      const allCodeSnippets = arrayToObject(problem.codeSnippet);

      setEditorValue(allCodeSnippets[language]);
    }
  }, [problem, language]);

  const handleRun = async () => {
    if (!code) {
      toast("please write some code to run 😅");
      return;
    }
    const data = {
      code,
      problemId,
      language,
    };
    await executeCode(data);
    console.log("Response after executing code: ", runCodeResults);
    setTestTabValue("testCaseResult");
  };

  const handleSubmit = async () => {
    if (!code) {
      toast("please write some code to submit 😅");
      return;
    }
    const data = {
      code,
      problemId,
      language,
    };
    await submitCode(data);
    console.log("Response after executing code: ", submitCodeResults);

    // will work on this later !!!!
    setOpenSubmissionDialog(true);
  };

  const openSubmission = async () => {
    console.log("chal rha ha open submission function !!");
    await getSubmisions(problemId);
  };

  return (
    <div className="flex flex-col  h-fit w-fit overflow-hidden">
      <Dialog
        open={openSubmissionDialog}
        onOpenChange={setOpenSubmissionDialog}
      >
        <DialogTrigger></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {/* upar waala  */}
      <div className="flex items-center justify-between   pt-3 pb-4 ">
        {/* logo waala */}
        <div className="pl-4">
          <Image
            src="https://leetcode.com/_next/static/images/logo-dark-c96c407d175e36c81e236fcfdd682a0b.png"
            height={20}
            width={20}
            alt=""
            onClick={() => {
              router.push("/");
            }}
          />{" "}
        </div>
        {/* button waala */}
        <div className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 space-x-3">
          <Button
            disabled={isCodeRunning || isCodeSubmitting}
            className={`${
              isCodeRunning
                ? "bg-black  disabled:opacity-100 disabled:cursor-not-allowed"
                : "bg-gray-500 hover:bg-gray-400"
            }`}
            onClick={handleRun}
          >
            {isCodeRunning ? <LoaderFour text="running" /> : "run"}
          </Button>
          <Button
            disabled={isCodeSubmitting || isCodeRunning}
            className={`${
              isCodeSubmitting
                ? "bg-black  disabled:opacity-100 disabled:cursor-not-allowed"
                : "bg-green-500 hover:bg-green-400"
            }`}
            onClick={() => handleSubmit()}
          >
            {isCodeSubmitting ? <LoaderFour text="submitting" /> : "submit"}
          </Button>
        </div>
        {/* right side waala */}
        <div className="text-blue-500 font-bold mr-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="mr-4">
                <AvatarImage src="/description.svg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuGroup>
                <Link href="/profile">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Email</DropdownMenuItem>
                      <DropdownMenuItem>Message</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem>GitHub</DropdownMenuItem> */}
              <DropdownMenuItem>Support</DropdownMenuItem>
              {/* <DropdownMenuItem disabled>API</DropdownMenuItem> */}
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* neeche resizable waala  */}
      {/* temp fix giving this div padding from bottom and right to make it fuit on screen */}
      <div className="h-screen w-screen pb-20 -mb-20 pr-10">
        <ResizablePanelGroup
          direction="horizontal"
          // temp fix giving negative margin from right and bottom
          className="  bg-black space-x-1.5 ml-4 h-full w-full "
          // mr-2
          // ml-2
        >
          {/*  leftTop waala */}
          <ResizablePanel
            defaultSize={40}
            className="border-2  rounded-3xl h-full w-full  bg-[#1e1e1e]"
          >
            <Tabs
              defaultValue="description"
              className="mt-2"
              onValueChange={(value) => {
                if (value === "submission") {
                  openSubmission();
                }
              }}
            >
              <TabsList className="flex space-x-8 w-full pl-1">
                <TabsTrigger value="description">
                  <Image
                    src={"/description.svg"}
                    alt=""
                    height={15}
                    width={15}
                  />
                  description
                </TabsTrigger>
                <TabsTrigger value="editorial">
                  <Image src={"/editorial.svg"} alt="" height={15} width={15} />
                  editorial
                </TabsTrigger>
                <TabsTrigger value="submission">
                  <Image
                    src={"/submission.svg"}
                    alt=""
                    height={15}
                    width={15}
                  />
                  submissions
                </TabsTrigger>
                <TabsTrigger value="solutions">
                  <Image src={"/solution.svg"} alt="" height={15} width={18} />
                  solutions
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description">
                <ScrollArea className=" h-170 rounded-md border p-2">
                  <Description {...problem} />
                </ScrollArea>
              </TabsContent>
              <TabsContent value="editorial" className="bg-black">
                <div className="flex flex-col items-center justify-center h-screen">
                  <h1 className="md:text-77xl text-3xl lg:text-5xl font-bold text-center text-white relative z-20">
                    Coming Soon
                  </h1>
                  <div className="w-[40rem] h-40 relative">
                    <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                    <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                    <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                    <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

                    <SparklesCore
                      background="transparent"
                      minSize={0.4}
                      maxSize={1}
                      particleDensity={1200}
                      className="w-full h-full"
                      particleColor="#FFFFFF"
                    />

                    <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="submission">
                {areSubmissionsLoading ? (
                  <div className="flex justify-center items-center">
                    <LoaderFour text="loading submissions" />
                  </div>
                ) : (
                  <Submission submissions={submissions} />
                )}
              </TabsContent>
              <TabsContent value="solutions">
                <CodeBlock
                  language={language}
                  code={problem?.codeSnippet?.[0].code}
                />
              </TabsContent>
            </Tabs>
          </ResizablePanel>
          {/* <Separator orientation="vertical" className="" /> */}
          <ResizableHandle className="bg-transparent" />

          {/* left waale dono */}

          <ResizablePanel
            defaultSize={60}
            className=" border-transparent rounded-3xl bgblack"
            // mt-1
          >
            <ResizablePanelGroup
              direction="vertical"
              className="border-2 rounded-3xl space-y-1.5"
            >
              {/* code editor waala*/}
              <ResizablePanel
                defaultSize={60}
                className="border-2 rounded-3xl bg-[#1e1e1e]"
              >
                <Select
                  defaultValue="JAVA"
                  onValueChange={(value) => setLanguage(value)}
                >
                  <SelectTrigger className="ml-3 mt-1">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Language</SelectLabel>
                      <SelectItem value="JAVASCRIPT">Javascript</SelectItem>
                      <SelectItem value="JAVA">Java</SelectItem>
                      <SelectItem value="PYTHON">Python</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Separator className="bg-gray-500" />
                {isProblemLoading ? (
                  ""
                ) : (
                  <Editor
                    className=" h-full"
                    height="100%"
                    language={language.toLowerCase()}
                    theme="vs-dark"
                    defaultValue={code}
                    value={editorValue}
                    onChange={(value) => setCode(value || "")}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 13,
                      lineNumbers: "on",
                      roundedSelection: false,
                      scrollBeyondLastLine: false,
                      readOnly: false,
                      automaticLayout: true,
                      cursorStyle: "line",
                      cursorBlinking: "expand",
                      cursorSmoothCaretAnimation: true,
                      contextmenu: false,
                    }}
                    defaultLanguage="java"
                  />
                )}
              </ResizablePanel>
              <ResizableHandle className="bg-transparent" />
              {/* <Separator className="bg-gray-600" /> */}

              {/* {right neeche waala} */}
              <ResizablePanel
                defaultSize={40}
                className=" border-2 rounded-2xl  bg-[#1e1e1e]"
              >
                <Tabs
                  defaultValue="testCase"
                  value={testTabValue}
                  onValueChange={setTestTabValue}
                  className="space-x-4 h-fit"
                >
                  <TabsList>
                    <TabsTrigger value="testCase">
                      {" "}
                      <Image
                        src={"/testCheckBox.svg"}
                        alt=""
                        height={10}
                        width={15}
                      />{" "}
                      Testcase{" "}
                    </TabsTrigger>{" "}
                    <TabsTrigger value="testCaseResult">
                      {" "}
                      <Image
                        src={"/testResult.svg"}
                        alt=""
                        height={10}
                        width={17}
                      />{" "}
                      Test Result{" "}
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="testCase" className="h-fit">
                    <ScrollArea className="h-60 overflow-auto pb-4">
                      <div className="flex justify-center items-center">
                        {/* {problem?.testCases?.map((element, index) => ())} */}
                        <Tabs
                          // value={activeTab} onValueChange={setActiveTab}
                          defaultValue="0"
                          className="w-full"
                        >
                          <TabsList className="space-x-4 text-bold ml-4">
                            {problem?.testCases?.map((res, index) => (
                              <TabsTrigger
                                key={index + 1}
                                value={index.toString()}
                              >
                                Case {index + 1}
                                {/* {res.passed ? " ✅" : " ❌"} */}
                              </TabsTrigger>
                            ))}
                          </TabsList>

                          {problem?.testCases?.map((res, index) => (
                            <TabsContent
                              key={index + 1}
                              value={index.toString()}
                              className="p-2"
                            >
                              {/* <p>
                              <b>Input:</b>
                              <br />
                              <input
                                disabled={true}
                                placeholder={res.input}
                                defaultValue={res.input}
                                className="ml-8 border-1 w-100"
                              /> */}
                              <FieldSet>
                                {/* <FieldLegend>Profile</FieldLegend>
                                <FieldDescription>
                                  This appears on invoices and emails.
                                </FieldDescription> */}
                                <FieldGroup>
                                  <Field className="">
                                    <FieldLabel className="text-bold text-1xl">
                                      Input:
                                    </FieldLabel>
                                    <Input
                                      // disabled={true}
                                      defaultValue={res.input}
                                      // placeholder="Evil Rabbit"
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
                                      defaultValue={res.expectedOutput}
                                    />
                                  </Field>
                                </FieldGroup>
                              </FieldSet>
                            </TabsContent>
                          ))}
                        </Tabs>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="testCaseResult">
                    <RunCodeResults results={runCodeResults?.data} />
                  </TabsContent>
                </Tabs>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Page;
