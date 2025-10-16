import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


const Submission = ({ submissions }) => {
  const [open, setOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  return (
    <div>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="">Status</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Time</TableHead>
            <TableHead className="">Memory</TableHead>
            <TableHead className="">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions?.map((element, index) => (
            <TableRow
              key={index}
              // onClick={() => {
              //   setSelectedSubmission(element); // 👈 row ka data set kar
              //   setOpen(true); // 👈 dialog khol de
              // }}
            >
              <TableCell
                className={
                  element.status === "ACCEPTED"
                    ? "font-bold text-1xl text-green-400 ml-4 mb-4"
                    : "font-bold text-1xl text-red-600 ml-4 mb-4"
                }
              >
                {element.status}
              </TableCell>
              <TableCell className="">{element.language}</TableCell>
              <TableCell>{element.time + " s"}</TableCell>
              <TableCell>{Math.floor(Number(element.memory)) + " KB"}</TableCell>
              <TableCell>{element.createdAt.split("T")[0]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3}>Total</TableCell>
                      <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                  </TableFooter> */}
      </Table>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
            <DialogDescription>
              Detailed info of your selected submission.
            </DialogDescription>
          </DialogHeader>

          {selectedSubmission ? (
            <div>details wala kaam baki ha !!!</div>
          ) : (
            <p>No data found.</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Submission
