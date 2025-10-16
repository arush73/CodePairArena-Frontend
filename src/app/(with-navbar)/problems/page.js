// "use client";
// import React, { useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useProblemStore } from "@/app/store/useProblemStore";
// import { useRouter } from "next/navigation";
// import { LoaderOne } from "@/components/ui/loader";

// const Page = () => {
//   const { areProblemsLoading, getAllProblems, allLoadedProblems } =
//     useProblemStore();

//   const router = useRouter();

//   useEffect(() => {
//     getAllProblems();
//   }, [getAllProblems]);
//   useEffect(() => {
//     document.title = "anurag chamar";
//   }, []);

//   useEffect(() => {
//     console.log("Problems loaded successfully: ", allLoadedProblems);
//   }, [allLoadedProblems]);

//   const capitalizeDifficulty = (str) =>
//     str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

//   const handleClick = (id) => {
//     router.push(`/problems/${id}`);
//   };
//   return (
//     <>
//       {areProblemsLoading ? (
//         <div className="flex justify-center items-center h-screen">

//         <LoaderOne/>
//         </div>
//       ) : (
//         <div className="flex flex-col items-center justify-center p-30">
//           {allLoadedProblems ? (
//             <Table className="">
//               {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
//               <TableHeader >
//                 <TableRow>
//                   <TableHead className="">title</TableHead>
//                   <TableHead>Difficulty</TableHead>

//                   {/* <TableHead>Time</TableHead>
//                   <TableHead className="">Memory</TableHead> */}
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {allLoadedProblems?.map((element, index) => (
//                   <TableRow
//                     key={index}
//                     onClick={() => {
//                       handleClick(element._id);
//                     }}
//                   >
//                     <TableCell className="">
//                       {element.id + ". " + element.title}
//                     </TableCell>
//                     <TableCell
//                       className={
//                         element.difficulty === "EASY"
//                           ? "text-green-500 font-bold"
//                           : element.difficulty === "MEDIUM"
//                           ? "text-yellow-400 font-medium"
//                           : "text-red-500 font-medium"
//                       }
//                     >
//                       {capitalizeDifficulty(element.difficulty)}
//                     </TableCell>
//                     <TableCell>{element.time}</TableCell>
//                     <TableCell>{element.memory}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           ) : (
//             "anurag chamar ha"
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default Page;

"use client";
import React, { useEffect } from "react";
import { useProblemStore } from "@/app/store/useProblemStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoaderFour } from "@/components/ui/loader";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// export const metadata = {
//   title: "Problems | CodeArena",
//   description:
//     "Browse coding challenges and improve your problem-solving skills.",
// };

const Page = () => {
  const { areProblemsLoading, getAllProblems, allLoadedProblems } =
    useProblemStore();
  const [filter, setFilter] = React.useState("ALL");
  const [search, setSearch] = React.useState("");
  const router = useRouter()

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  const filteredProblems = allLoadedProblems?.filter((problem) => {
    const matchSearch = problem.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchFilter = filter === "ALL" || problem.difficulty === filter;
    return matchSearch && matchFilter;
  });

  const getDifficultyColor = (diff) => {
    switch (diff?.toUpperCase()) {
      case "EASY":
        return "text-green-500 bg-green-500/10";
      case "MEDIUM":
        return "text-yellow-400 bg-yellow-400/10";
      case "HARD":
        return "text-red-500 bg-red-500/10";
      default:
        return "text-gray-400";
    }
  };

  if (areProblemsLoading)
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <LoaderFour />
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-background text-foreground px-6 md:px-12 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Problems</h1>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Input
              placeholder="Search problems..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-64"
            />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="EASY">Easy</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HARD">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60%] text-left">Title</TableHead>
                <TableHead className="text-center">Difficulty</TableHead>
                <TableHead className="text-center">Time</TableHead>
                <TableHead className="text-center">Memory</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProblems?.length > 0 ? (
                filteredProblems.map((element, index) => (
                  <TableRow
                    key={index}
                    className="cursor-pointer transition-colors duration-150 hover:bg-muted/50"
                    onClick={() => router.push(`/problems/${element._id}`)} 
                  >
                    <TableCell className="font-medium">
                      {element.title}
                    </TableCell>
                    <TableCell className="text-center">
                      <span
                        className={cn(
                          "text-sm font-medium px-3 py-1 rounded-full",
                          getDifficultyColor(element.difficulty)
                        )}
                      >
                        {element.difficulty.charAt(0).toUpperCase() +
                          element.difficulty.slice(1).toLowerCase()}
                      </span>
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground">
                      {element.time || "—"}
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground">
                      {element.memory || "—"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-10 text-muted-foreground"
                  >
                    No problems found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Page;
