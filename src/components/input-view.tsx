"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ArrowLeft } from "lucide-react";
import { convertPreferencesToText } from "../utils/preferencesToText";

export function InputViewComponent() {
  const [menuInput, setMenuInput] = useState("");
  const [recommendation, setRecommendation] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    const storedPreferences = localStorage.getItem("foodPreferences");
    const preferences = convertPreferencesToText(
      JSON.parse(storedPreferences ?? "{}")
    );

    const prompt = `These are my food preferences:\n${preferences}\n\nThe menu of the restaurant is:\n${menuInput}`;

    console.log(prompt);

    try {
      const response = await fetch(`${process.env.PROCESSOR_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `<|im_start|>system\nyou are a helpful nutrition specialist, focusing on healthy food recommendations. Give clear and concise answers.<|im_end|>\n<|im_start|>user${prompt}<|im_end|>\n<|im_start|>assistant`,
          temperature: 0.2,
          n_predict: 100,
          // n_keep: 0,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const data = await response.json();
      setRecommendation(data.content);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setRecommendation(
        "An error occurred while fetching recommendations. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Nutri Twin Menu Analysis</CardTitle>
        <Link href="/" passHref>
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Questionnaire
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="menu-input">Paste the restaurant menu here:</Label>
          <Textarea
            id="menu-input"
            value={menuInput}
            onChange={(e) => setMenuInput(e.target.value)}
            placeholder="Paste the full restaurant menu here..."
            className="min-h-[200px]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="output">Our recommendations:</Label>
          <Card className="bg-muted">
            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : recommendation.length > 0 ? (
                <>
                  {recommendation.split("\n").map((line, index) => (
                    <p key={index} className="mb-2 font-medium">
                      {line}
                    </p>
                  ))}
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Your personalized recommendations will appear here after you
                  submit a menu.
                </p>
              )}
            </ScrollArea>
          </Card>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Menu
            </>
          ) : (
            "Analyze Menu"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
