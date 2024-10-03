"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function InputViewComponent() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = () => {
    // Here you would typically send the input to a server and get a response
    // For now, we'll just echo the input
    setOutput(`You entered: ${input}`);
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Food Butler Input</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="input">Enter your request:</Label>
          <Input
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., Suggest a recipe based on my preferences"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="output">Response:</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Response will appear here"
            className="h-32"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
